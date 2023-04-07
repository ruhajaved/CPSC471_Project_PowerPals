const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root", // add your db username here
  password: "1234", // add your db password here
  database: "power_pals",
  connectionLimit: 10,
});

// Connect to the MySQL database
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connected to database with connection ID:", connection.threadId);
  connection.release();
});

module.exports = pool;
