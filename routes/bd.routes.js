const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
// const jwt = require("jsonwebtoken");
// const shorten = require("simple-short");
// const tokenSecret = "myWebTokenSecret";
// const bcrypt = require("bcryptjs");
const path = require("path");

const pool = mysql.createPool({
	host: "31.31.196.109",
	user: "u1588120_root",
	database: "u1588120_database",
	password: "Surenkov1985@gmail.com",
});

router.get("/", (req, res) => {
	pool.query("SELECT * FROM TOUR_EVENTS", (error, data) => {
		if (error) {
			return res.status(400).json({ message: "ошибка сервера" });
		}

		return res.status(200).json(data);
	});
});

router.get("/tour:id", (req, res) => {
	const id = req.params.id;

	pool.query("SELECT * FROM TOUR_EVENTS WHERE id=?", id, (error, data) => {
		if (error) {
			return res.status(200).json({ message: "Ошибка" });
		}
		return res.status(200).json(...data);
	});
});

module.exports = router;
