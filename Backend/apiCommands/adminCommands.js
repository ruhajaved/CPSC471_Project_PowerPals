const { response } = require("express");
const pool = require("../db");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM company_admin WHERE Email = ? AND Password = ?",
    [email, password],
    (error, results) => {
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
        return;
      } else {
        res.status(401).send("Invalid username or password");
        return;
      }
    }
  );
};

const getAllGyms = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
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

const createGym = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const gym = req.body.gym;
  const studios = req.body.studios;
  console.log(req.body);
  // First, insert the new gym into the database
  pool.query(
    "INSERT INTO gym (Address, Gym_Name) VALUES (?, ?)",
    [gym.address, gym.name],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: "Error creating gym", error: error });
        return;
      }

      const gymId = results.insertId;

      // Then, insert each studio into the database
      pool.query(
        `INSERT INTO studio (Gym_ID, Studio_Room_No, Studio_Name, Studio_Size) VALUES ?`,
        [
          studios.map((studio) => [
            gymId,
            studio.roomNo,
            studio.name,
            studio.size,
          ]),
        ],
        (error, results, fields) => {
          if (error) {
            res
              .status(500)
              .json({ message: "Error creating studios", error: error });
            return;
          }

          res.json({ message: "Gym created successfully", gymId: gymId });
          return;
        }
      );
    }
  );
};

const deleteGym = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }

  const gymId = req.params.id;

  pool.query(
    "DELETE FROM gym WHERE Gym_ID = ?",
    [gymId],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting gym", error: error });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "Gym not found" });
        return;
      }
      res.json({ message: `Gym with id ${gymId} deleted successfully` });
      return;
    }
  );
};

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const updateGym = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }

  console.log(req.body);
  const gymId = req.params.id;
  const gymUpdates = req.body.gym;
  const studios = req.body.studios;

  const gymQueryParts = [];
  const gymQueryValues = [];

  // Build the SET clause for the gym query
  Object.keys(gymUpdates).forEach((key) => {
    gymQueryParts.push(`${key} = ?`);
    gymQueryValues.push(gymUpdates[key]);
  });

  // Add the gym ID as the last value in the gym query values array
  gymQueryValues.push(gymId);

  try {
    // Update the gym
    const gymQuery = `UPDATE gym SET ${gymQueryParts.join(
      ", "
    )} WHERE Gym_ID = ?`;
    await query(gymQuery, gymQueryValues);

    // Delete all of the studios for the gym
    const deleteQuery = "DELETE FROM studio WHERE Gym_ID = ?";
    await query(deleteQuery, [gymId]);

    // Insert each studio into the database
    const insertQuery = `INSERT INTO studio (Gym_ID, Studio_Room_No, Studio_Name, Studio_Size) VALUES ?`;
    const studioValues = studios.map((studio) => [
      gymId,
      studio.roomNo,
      studio.name,
      studio.size,
    ]);
    await query(insertQuery, [studioValues]);

    res.json({ message: "Gym updated successfully", gymId: gymId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating gym", error: error });
  }
};

const getAllInstructors = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  // query to get all instructors and their associated class types
  // execute the query
  pool.query(
    `
    SELECT 
      instructor.*,
      GROUP_CONCAT(class_type.Class_Category SEPARATOR ', ') AS classes_taught
    FROM 
      instructor 
      JOIN instructor_can_teach_class_type 
        ON instructor.Instructor_ID = instructor_can_teach_class_type.Instructor_ID 
      JOIN class_type 
        ON instructor_can_teach_class_type.Class_Category = class_type.Class_Category 
    GROUP BY 
      instructor.Instructor_ID, 
      instructor.First_Name, 
      instructor.Last_Name;
    `,
    (err, results) => {
      // release the connection back to the pool
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      // return the results
      res.json(results);
      return;
    }
  );
};

const createInstructor = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const instructor = req.body.instructor;
  const classes = req.body.classes;
  // Insert instructor into the instructor table
  const insertInstructorQuery =
    "INSERT INTO instructor (first_name, last_name, address, email, gender, languages, status_active) VALUES (?, ?, ?, ?, ?, ?, ?)";
  pool.query(
    insertInstructorQuery,
    [
      instructor.first_name,
      instructor.last_name,
      instructor.address,
      instructor.email,
      instructor.gender,
      instructor.languages,
      true,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      }

      const instructorID = result.insertId;

      // Insert the instructor's class categories into the instructor_can_teach_class_type table
      const insertCanTeachQuery =
        "INSERT INTO instructor_can_teach_class_type (instructor_id, class_category) VALUES ?";
      pool.query(
        insertCanTeachQuery,
        [classes.map((category) => [instructorID, category])],
        (err, result) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send("Error adding instructor's class categories to database");
            return;
          }

          res.status(200).json({ message: "Success" });
          return;
        }
      );
    }
  );
};

const updateInstructor = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const instructorId = req.params.id;
  const instructor = req.body.instructor;
  const classes = req.body.classes;
  const connection = await pool.promise().getConnection();
  try {
    await connection.beginTransaction();
    const [results] = await connection.execute(
      "UPDATE instructor SET first_name = ?, last_name = ?, address = ?, email = ?, gender = ?, languages = ?, status_active = ? WHERE instructor_id = ?",
      [
        instructor.first_name,
        instructor.last_name,
        instructor.address,
        instructor.email,
        instructor.gender,
        instructor.languages,
        instructor.status_active,
        instructorId
      ]
    );
    // Update instructor_can_teach_class_type table
    const deleteQuery =
      "DELETE FROM instructor_can_teach_class_type WHERE instructor_id = ?";
    const insertQuery =
      "INSERT INTO instructor_can_teach_class_type (instructor_id, class_category) VALUES (?, ?)";

    await connection.execute(deleteQuery, [instructorId]);
    for (const category of classes) {
      await connection.execute(insertQuery, [instructorId, category]);
    }
    await connection.commit();
    res
      .status(200)
      .json({ message: `Instructor ${instructorId} has been updated.` });
  } catch (err) {
    console.error(err);
    await connection.rollback();
    res.status(500).json(err);
  } finally {
    await connection.release();
  }
};

const getAllClasses = (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const query = `SELECT fitness_class.*, gym.*, studio.*, class_type.*, instructor.*, company_admin.Email AS admin_email
  FROM fitness_class 
  INNER JOIN gym ON fitness_class.Gym_ID = gym.Gym_ID 
  INNER JOIN studio ON fitness_class.Studio_Room_No = studio.Studio_Room_No AND gym.Gym_ID = studio.Gym_ID 
  INNER JOIN class_type ON fitness_class.Class_Category = class_type.Class_Category 
  INNER JOIN instructor ON fitness_class.Instructor_ID = instructor.Instructor_ID 
  INNER JOIN company_admin ON fitness_class.Admin_ID = company_admin.Admin_ID;  
`;

  pool.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving classes.");
      return;
    }

    res.status(200).send(results);
  });
};

const createClass = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const {
    Class_Cost,
    Class_Name,
    Class_Duration,
    Class_Date,
    Class_Description,
    No_of_Max_Ppl,
    Class_Time,
    Admin_ID,
    Gym_ID,
    Studio_Room_No,
    Class_Category,
    Instructor_ID,
  } = req.body.classInfo;
  console.log(req.body.classInfo);

  const sql = `INSERT INTO fitness_class (Class_Cost, Class_Name, Class_Duration, Class_Date, Class_Description, No_of_Max_Ppl, Class_Time, Admin_ID, Gym_ID, Studio_Room_No, Class_Category, Instructor_ID)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(
    sql,
    [
      parseInt(Class_Cost),
      Class_Name,
      Class_Duration,
      Class_Date,
      Class_Description,
      No_of_Max_Ppl,
      Class_Time,
      Admin_ID,
      Gym_ID,
      Studio_Room_No,
      Class_Category,
      Instructor_ID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      } else {
        res.status(200).json({ message: "New class created successfully" });
        return;
      }
    }
  );
};

const deleteClass = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  try {
    const classId = req.params.id;

    const connection = await pool.promise().getConnection();

    await connection.beginTransaction();

    // Delete payment_for_classes for the given classId
    await connection.query(
      "DELETE FROM payment_for_classes WHERE Class_ID = ?",
      [classId]
    );

    // Delete payments for the given classId
    await connection.query(
      "DELETE FROM payment WHERE Transaction_ID IN (SELECT Transaction_ID FROM payment_for_classes WHERE Class_ID = ?)",
      [classId]
    );

    // Delete the fitness_class for the given classId
    await connection.query("DELETE FROM fitness_class WHERE Class_ID = ?", [
      classId,
    ]);

    await connection.commit();

    connection.release();
    res.status(200).json({
      message: "Fitness class and associated payments deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
const updateClass = async (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const classId = req.params.id;
  const {
    Class_Name,
    Class_Date,
    Class_Time,
    Class_Cost,
    No_of_Max_Ppl,
    Class_Description,
    Class_Duration,
  } = req.body;

  console.log(req.body);

  pool.query(
    "UPDATE fitness_class SET Class_Name = ?, Class_Date = ?, Class_Time = ?, Class_Cost = ?, No_of_Max_Ppl = ?, Class_Description = ?, Class_Duration = ? WHERE Class_ID = ?",
    [
      Class_Name,
      Class_Date,
      Class_Time,
      Class_Cost,
      No_of_Max_Ppl,
      Class_Description,
      Class_Duration,
      classId,
    ],
    (err, results, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      } else {
        res.status(200).send("Class Updated!");
        return;
      }
    }
  );
};

const getAllCategories = (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  pool.query("SELECT * FROM class_type", function (err, results, fields) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    } else {
      res.status(200).json(results);
      return;
    }
  });
};

const createCategory = (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const { Class_Category, Intensity_Level, Equipment_Required } = req.body;

  const query =
    "INSERT INTO class_type (Class_Category, Intensity_Level, Equipment_Required) VALUES (?, ?, ?)";
  const values = [Class_Category, Intensity_Level, Equipment_Required];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(`New category added: ${Class_Category}`);
      res.status(200).json({ message: "New category added" });
    }
  });
};

const deleteCategory = (req, res) => {
  if (!req.headers["admin"]) {
    res.status(404).json({ error: "Need to be an admin" });
    return;
  }
  const categoryName = req.params.categoryName;
  const sql = `DELETE FROM class_type WHERE Class_Category = ?`;
  pool.query(sql, [categoryName], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    } else {
      res.status(200).json({
        message: `Class category "${categoryName}" has been deleted.`,
      });
      return;
    }
  });
};

module.exports = {
  loginAdmin,
  getAllGyms,
  createGym,
  deleteGym,
  updateGym,
  getAllInstructors,
  createInstructor,
  updateInstructor,
  getAllClasses,
  createClass,
  deleteClass,
  updateClass,
  getAllCategories,
  createCategory,
  deleteCategory,
};
