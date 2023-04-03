const { response } = require("express");
const pool = require("../db");

const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error connecting to database");
      return;
    }

    connection.query(
      "SELECT * FROM company_admin WHERE Email = ? AND Password = ?",
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

const getAllGyms = (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    connection.query(
      "SELECT * FROM gym LEFT JOIN studio ON gym.Gym_ID = studio.Gym_ID",
      (error, results, fields) => {
        connection.release();

        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        // Group the results by gym ID
        const gyms = {};
        results.forEach((row) => {
          const gymId = row.Gym_ID;
          console.log(row);
          if (!gyms[gymId]) {
            gyms[gymId] = {
              gymId: gymId,
              address: row.Address,
              name: row.Gym_Name,
              studios: [],
            };
          }
          if (row.Studio_Room_No) {
            gyms[gymId].studios.push({
              gymId: gymId,
              roomNo: row.Studio_Room_No,
              studioName: row.Studio_Name,
              studioSize: row.Studio_Size,
            });
          }
        });

        // Convert the object to an array and send as JSON
        const response = Object.values(gyms);
        res.json(response);
      }
    );
  });
};

const createGym = (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const gym = req.body.gym;
  const studios = req.body.studios;
  // First, insert the new gym into the database
  pool.query(
    "INSERT INTO gym (Address, Gym_Brand, Gym_Branch) VALUES (?, ?, ?)",
    [gym.address, gym.brand, gym.branch],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Error creating gym", error: error });
        return;
      }

      const gymId = results.insertId;

      // Then, insert each studio into the database
      const studioValues = studios
        .map((s) => `(${gymId}, '${s.roomNo}', '${s.name}', ${s.size})`)
        .join(",");
      const studioQuery = `INSERT INTO studio (Gym_ID, Studio_Room_No, Studio_Name, Studio_Size) VALUES ${studioValues}`;
      pool.query(studioQuery, (error, results, fields) => {
        if (error) {
          res
            .status(500)
            .json({ message: "Error creating studios", error: error });
          return;
        }

        res.json({ message: "Gym created successfully", gymId: gymId });
      });
    }
  );
};

const deleteGym = (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }

  const gym_id = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).send(`Error connecting to database: ${err}`);
      return;
    }

    // Start a transaction to ensure data consistency
    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        res.status(500).send(`Error starting transaction: ${err}`);
        return;
      }

      // Delete the gym and all of its corresponding studios
      connection.query(
        "DELETE FROM gym WHERE Gym_ID = ?",
        gym_id,
        (error, results, fields) => {
          if (error) {
            connection.rollback(() => {
              connection.release();
              res.status(500).send(`Error deleting gym: ${error}`);
            });
            return;
          }
          connection.release();
          if (results.affectedRows === 0) {
            console.error(`Gym with id ${gym_id} not found`);
            res.status(404).json({ message: "Gym not found" });
          } else {
            console.log(`Deleted gym with id ${gym_id}`);
            res.status(200).json({ message: "Gym Deleted Succesfully" }); // No content
          }
        }
      );
    });
  });
};

module.exports = { loginAdmin, getAllGyms, createGym, deleteGym };
