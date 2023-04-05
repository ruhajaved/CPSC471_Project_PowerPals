const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
