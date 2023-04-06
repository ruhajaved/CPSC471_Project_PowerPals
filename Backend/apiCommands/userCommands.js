const { response } = require("express");
const pool = require("../db");

const getMembership = async (req, res) => {
    // DO AUTH STUFF HERE? CHECK IF CUSTOMER ID IN DB?

    // FIX THIS:
    // console.log(req.headers.CustomerId);
    // if (!req.headers.CustomerId) {
    //     res.status(404).json({ error: "Need to have CustomerId header." });
    //     return;
    //   }
    const customerId = "1";//req.headers["customerId"];

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
    const customerId = "10"; // for now hardcoded - FIX

    // Get membership + payment details from body.
    const {
        tier,
        amount,
        creditCardNo,
        promoCode,
    } = req.body;

    // if there is a promo code - doublecheck that it is valid - DO THIS HERE OR ON THE FRONTEND? OMITTED

    const connection = await pool.promise().getConnection();
    try{
        await connection.beginTransaction();
        // Create membership - save new membership ID.
        const mem_results = await connection.execute(
            "INSERT INTO membership (Tier, Discount_Amount, Customer_ID) VALUES (?, 20, ?)",     // POTENTIALLY GET RID OF DISCOUNT CODE
            [tier, customerId]
        );
        const membershipId = mem_results[0].insertId;
        console.log(mem_results[0].insertId);
        
        // Create payment - account for the fact that promo code might be used or might not be.
         // UTC?
        const dateTime = new Date();
        // var dateTime = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
        //   now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        var payment_results;
        if (promoCode) {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No, Promo_Code) VALUES (?, ?, ?, ?)",
                [dateTime, amount, creditCardNo, promoCode]
            );
        }
        else {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No) VALUES (?, ?, ?)",
                [dateTime, amount, creditCardNo]
            );
        }
        const transactionId = payment_results[0].insertId;

        // create new payment for membership.
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
    const customerId = "9"; // for now hardcoded - FIX

    // Get membership + payment details from body.
    const {
        classId,
        amount,
        creditCardNo,
        promoCode,
    } = req.body;

    // if there is a promo code - doublecheck that it is valid - DO THIS HERE OR ON THE FRONTEND? OMITTED

    const connection = await pool.promise().getConnection();
    try{
        await connection.beginTransaction();
        
        // Create payment - account for the fact that promo code might be used or might not be.
         // UTC?
        const dateTime = new Date();
        // var dateTime = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
        //   now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        var paymentQuery;
        if (promoCode) {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No, Promo_Code) VALUES (?, ?, ?, ?)",
                [dateTime, amount, creditCardNo, promoCode]
            );
        }
        else {
            payment_results = await connection.execute(
                "INSERT INTO payment (Trans_DateTime, Amount, Credit_Card_No) VALUES (?, ?, ?)",
                [dateTime, amount, creditCardNo]
            );
        }
        const transactionId = payment_results[0].insertId;

        // create new payment for class.
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

module.exports = { getMembership, buyMembership, buyClass };