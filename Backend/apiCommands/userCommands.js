const { response } = require("express");
const pool = require("../db");

const loginUser = (req, res) => {
  const { email, password } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error connecting to database");
      return;
    }
    
    connection.query(
      "SELECT * FROM customer WHERE Email = ? AND Password = ?",
      [email, password],
      (error, results) => {
        connection.release();

        if (error) {
          console.error(error);
          res.status(500).send("Error querying database");
          return;
        }

        if (results.length > 0) {
          console.log(results);
          const adminId = results[0].admin_id;
          let admin = results[0];
          admin["password"] = "";
          res.status(200).send(admin);
        } else {
          res.status(401).send("Invalid username or password");
        }
      }
    );
  });
};

const SignUpUser = (req, res) => {
//COMMENT THIS SECTION OUT 
  //  if (!req.headers["admin"]) {
//    res.status(404).json({ error: "Need to be an admin" });
//    return;
//  }
  const customer = req.body.customer;
//  const studios = req.body.studios;

  // First, insert the new gym into the database
  pool.query(
    "INSERT INTO customer (First_Name, Last_Name, Address, Email, Gender, Date_Of_Birth, Password) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [customer.First_Name, customer.Last_Name, customer.Address, customer.Email, customer.Gender,, customer.Date_Of_Birth, customer.Password],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Error creating user account", error: error });
        return;
      }

      const customerId = results.insertId;

        res.json({ message: "Customer Account created successfully", customerId: customerId });
      });
    }




module.exports = { loginUser, SignUpUser};
