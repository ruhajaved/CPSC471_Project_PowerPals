const { response } = require("express");
const pool = require("../db");

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
    } = req.body;

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
        const validPromoCode = await checkPromoCode(promoCode);
        if(!validPromoCode){
            res.status(500).send(`Invalid promo code ${promoCode}.`);
            return;
        }
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
                [dateTime, paymentAmount, creditCardNo, promoCode]
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
        res.status(200).send(`New membership added with ID ${membershipId}.`);
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
    } = req.body;

    // If there is a promo code - double check that it is valid.
    if (promoCode)
    {
        const validPromoCode = await checkPromoCode(promoCode);
        if(!validPromoCode){
            res.status(500).send(`Invalid promo code ${promoCode}.`);
            return;
        }
    }

    const connection = await pool.promise().getConnection();
    try{
        await connection.beginTransaction();
        
        // Create payment - account for the fact that promo code might be used or might not be.
         // UTC?
        const dateTime = new Date();
        if (promoCode) {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No, Promo_Code) VALUES (?, ?, ?, ?)",
                [dateTime, paymentAmount, creditCardNo, promoCode]
            );
        }
        else {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No) VALUES (?, ?, ?)",
                [dateTime, paymentAmount, creditCardNo]
            );
        }
        const transactionId = payment_results[0].insertId;

        // Create new payment for class.
        await connection.execute(
            "INSERT INTO payment_for_classes (Class_ID, Transaction_ID, Customer_ID) VALUES (?, ?, ?)",
            [classId, transactionId, customerId]
        );

        await connection.commit();
        res.status(200).send(`Class successfully bought.`);
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
            res.status(200).send(results);
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
            return true;
        else
            return false;
    } catch(error) {
        console.error(err);
        await connection.rollback();
    } finally {
        await connection.release();
    }
}

module.exports = { loginUser, signUpUser, getMembership, buyMembership, buyClass, getPaymentForClasses };