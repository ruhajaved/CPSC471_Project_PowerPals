const { response } = require("express");
const pool = require("../db");

TierDiscounts = {
    "Gold" : 20,
    "Silver": 10,
    "Bronze": 5
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
        
    pool.query(
        "SELECT * FROM customer WHERE Email = ? AND Password = ?",
        [email, password],
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send("Error logging in user.");
                return;
            }

            if (results.length > 0) {
                console.log(results);
                let user = results[0];
                user["password"] = "";
                res.status(200).send(user);
                return;
            } else {
                res.status(401).send("Invalid username or password");
                return;
            }
        }
    )
};

const signUpUser = async (req, res) => {
    const {
        firstName,
        lastName,
        address,
        email,
        gender,
        dateOfBirth,
        password
    } = req.body.customer;

    pool.query(
        "INSERT INTO customer (First_Name, Last_Name, Address, Email, Gender, Date_Of_Birth, Password) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [firstName, lastName, address, email, gender, dateOfBirth, password],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ message: "Error creating user account.", error: error });
                return;
            }
            const customerId = results.insertId;
            res.status(200).send({ message: "Customer Account created successfully.", customerId: customerId });
            return;
        }
    )
};

const getMembership = async (req, res) => {
    if (!req.headers["customerid"]) {
        res.status(404).json({ error: "Need to have CustomerId header." });
        return;
      }
    const customerId = req.headers["customerid"];

    pool.query(
        "SELECT * FROM membership WHERE customer_Id = ?",
        [customerId],
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Error getting membership", error: error });
                return;
                }
            console.log(results);
            if (results.length > 0) {
                const membership = results[0];
                res.status(200).send(membership);
                return;
            }
            else {
                res.status(200).send({});
                return;
            }
        }
    )
};

const buyMembership = async (req, res) => {

    // Parse customer ID from header.
    if (!req.headers["customerid"]) {
        res.status(404).json({ error: "Need to have CustomerId header." });
        return;
      }
    const customerId = req.headers["customerid"];

    // Get membership + payment details from body.
    const {
        tier,
        paymentAmount,
        creditCardNo,
        promoCode,
    } = req.body;

    // If there is a promo code - double check that it is valid.
    if (promoCode)
    {
        const promoCodeDiscount = await checkPromoCode(promoCode);
        if(!promoCodeDiscount){
            res.status(500).send({message: `Invalid or old promo code ${promoCode}.`});
            return;
        }
        var adjustedPaymentAmount = paymentAmount * (100-promoCodeDiscount)/100;
    }

    const connection = await pool.promise().getConnection();
    try{
        await connection.beginTransaction();
        // Create membership - save new membership ID.
        const mem_results = await connection.execute(
            "INSERT INTO membership (Tier, Customer_ID) VALUES (?, ?)",
            [tier, customerId]
        );
        const membershipId = mem_results[0].insertId;
        console.log(mem_results[0].insertId);
        
        // Create payment - account for the fact that promo code might be used or might not be.
        const dateTime = new Date();
        var payment_results;
        if (promoCode) {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No, Promo_Code) VALUES (?, ?, ?, ?)",
                [dateTime, adjustedPaymentAmount, creditCardNo, promoCode]
            );
        }
        else {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No) VALUES (?, ?, ?)",
                [dateTime, paymentAmount, creditCardNo]
            );
        }
        const transactionId = payment_results[0].insertId;

        // Create new payment for membership.
        await connection.execute(
            "INSERT INTO payment_for_membership (Membership_ID, Transaction_ID, Customer_ID) VALUES (?, ?, ?)",
            [membershipId, transactionId, customerId]
        );

        await connection.commit();
        const response = {membershipId: `${membershipId}`};
        console.log(response);
        res.status(200).json(response);
        return;
    }
    catch (err) {
        console.error(err);
        await connection.rollback();
        res.status(500).send(err);
    } finally {
        await connection.release();
    }
};

const buyClass = async (req, res) => {

    // Parse customer ID from header.
    if (!req.headers["customerid"]) {
        res.status(404).json({ error: "Need to have CustomerId header." });
        return;
      }
    const customerId = req.headers["customerid"];

    // Get membership + payment details from body.
    const {
        classId,
        paymentAmount,
        creditCardNo,
        promoCode,
        tier
    } = req.body;

    var adjustedPaymentAmount = paymentAmount;
    // If there is a promo code - double check that it is valid.
    if (promoCode)
    {
        const promoCodeDiscount = await checkPromoCode(promoCode);
        if(!promoCodeDiscount){
            res.status(500).send({message: `Invalid or old promo code ${promoCode}.`});
            return;
        }
        adjustedPaymentAmount = adjustedPaymentAmount * (100-promoCodeDiscount)/100;
    }

    // If customer has membership, apply to total amount.
    if (tier)
    {
        tierDiscount = TierDiscounts[tier];
        adjustedPaymentAmount = adjustedPaymentAmount * (100-tierDiscount)/100;
    }

    const connection = await pool.promise().getConnection();
    try{
        await connection.beginTransaction();
        
        // Create payment - account for the fact that promo code might be used or might not be.
        const dateTime = new Date();
        if (promoCode) {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No, Promo_Code) VALUES (?, ?, ?, ?)",
                [dateTime, adjustedPaymentAmount, creditCardNo, promoCode]
            );
        }
        else {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No) VALUES (?, ?, ?)",
                [dateTime, adjustedPaymentAmount, creditCardNo]
            );
        }
        const transactionId = payment_results[0].insertId;

        // Create new payment for class.
        await connection.execute(
            "INSERT INTO payment_for_classes (Class_ID, Transaction_ID, Customer_ID) VALUES (?, ?, ?)",
            [classId, transactionId, customerId]
        );

        await connection.commit();
        const response = {message: "Class successfully bought.", 
                            classId: classId, 
                            transactionId: transactionId,
                            customerId: customerId};
        console.log(response);
        res.status(200).send(response);
        return;

    }
    catch (err) {
        console.error(err);
        await connection.rollback();
        res.status(500).send(err);
    } finally {
        await connection.release();
    }
};

const getPaymentForClasses = async (req, res) => {
    if (!req.headers["customerid"]) {
        res.status(404).json({ error: "Need to have CustomerId header." });
        return;
      }
    const customerId = req.headers["customerid"];

    pool.query(
        "SELECT * FROM payment_for_classes as C, payment as P, fitness_class as F WHERE c.Customer_Id = ? AND C.Transaction_Id = P.transaction_Id AND C.Class_Id = F.Class_Id",
        [customerId],
        (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Error getting payment for classes", error: error });
                return;
                }
            res.status(200).json(results);
            return;
        }
    )
};

 async function checkPromoCode(promo_code) {
    const connection = await pool.promise().getConnection();
    try{
        await connection.beginTransaction();
        const results = await connection.execute(
            "SELECT * FROM promo_code WHERE Promo_Code = ?",
            [promo_code]
        );
        await connection.commit();
        if (results[0].length > 0)
        {
            console.log(results[0][0].Discount_Amount);
            if (results[0][0].End_Date >= new Date(new Date().toDateString()))
            {
                return parseInt(results[0][0].Discount_Amount);
            }
        }
        else
            return 0;
    } catch(error) {
        console.error(error);
        await connection.rollback();
    } finally {
        await connection.release();
    }
 };

const getClasses = async (req, res) => {
    if (!req.headers["customerid"]) {
        res.status(404).json({ error: "Need to have CustomerId header." });
        return;
    }
    const customerId = req.headers["customerid"];

    pool.query(
        `SELECT *
        FROM 
            fitness_class, 
            instructor, 
            gym, 
            class_type, 
            studio 
        WHERE 
            fitness_class.Gym_ID = gym.Gym_ID 
            AND fitness_class.Instructor_ID = instructor.Instructor_ID 
            AND fitness_class.Class_Category = class_type.Class_Category 
            AND fitness_class.Studio_Room_No = studio.Studio_Room_No
            AND fitness_class.Class_Date >= ?;
        `,
        new Date(new Date().toDateString()),
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Error getting classes", error: error });
                return;
            }
            console.log(results);
            res.status(200).send(results);
            return;
        }
    )
};

const getAllGymsUsers = async (req, res) => {
    if (!req.headers["customerid"]) {
        res.status(404).json({ error: "Need to have CustomerId header." });
        return;
    }
  
    pool.query(
      `SELECT COALESCE(studio.Gym_ID, gym.Gym_ID) AS Gym_ID, gym.Address, gym.Gym_Name, studio.Studio_Room_No, studio.Studio_Name, studio.Studio_Size 
        FROM gym LEFT OUTER JOIN studio ON gym.Gym_ID = studio.Gym_ID`,
      (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
  
        // Group the results by gym ID
        const gyms = {};
        results.forEach((row) => {
          const gymId = row.Gym_ID;
          gyms[gymId] = {
            gymId: gymId,
            address: row.Address,
            name: row.Gym_Name,
            studios: [],
          };
        });
        results.forEach((row) => {
          const gymId = row.Gym_ID;
          if (row.Studio_Room_No) {
            gyms[gymId].studios.push({
              gymId: gymId,
              roomNo: row.Studio_Room_No,
              name: row.Studio_Name,
              size: row.Studio_Size,
            });
          }
        });
        // Convert the object to an array and send as JSON
        const response = Object.values(gyms);
        res.json(response);
        return;
      }
    );
  };


module.exports = { loginUser, signUpUser, getMembership, buyMembership, buyClass, getPaymentForClasses, getClasses, getAllGymsUsers };