const { response } = require("express");
const pool = require("../db");

const getMembership = (req, res) => {
    res.status(200).send("working");
}

module.exports = { getMembership };