const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/admin", adminRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
