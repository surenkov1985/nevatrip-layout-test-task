const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
// const jwt = require("jsonwebtoken");
// const shorten = require("simple-short");
// const tokenSecret = "myWebTokenSecret";
const bcrypt = require("bcryptjs");
const passwordGenerator = require("password-generator");
const nodemailer = require("nodemailer");
const path = require("path");

const pool = mysql.createPool({
	host: "31.31.196.109",
	user: "u1588120_root",
	database: "u1588120_database",
	password: "Surenkov1985@gmail.com",
});
let transporter = nodemailer.createTransport({
	host: "smtp.mail.ru",
	port: 465,
	auth: {
		user: "m.surenkov@mich-man.ru",
		pass: "M9601663587",
	},
});

let count = 0;
let date = null;
let dataArr = [];
const eventBarCode = null;

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

router.post("/reserveTickets", (req, res) => {
	if (!req.body) {
		return res.status(400).json({ message: "Отсутствуют данные" });
	}
	const body = req.body;
	let eventBarCode = null;

	if (!body.equal_date || !body.route || !body.equal_tickets || !body.email) {
		return res.status(400).json({ message: "Заполнены не все обязательные поля" });
	}

	const email = body.email;
	let userId = null;

	pool.getConnection((err, connection) => {
		connection.query("SELECT * FROM TOUR_USERS WHERE email=?", email, (error, data) => {
			if (error) {
				return res.status(400).json({ message: "ERROR" });
			}

			if (!data.length) {
				const password = passwordGenerator(10, false);
				const hashPassword = bcrypt.hashSync(password, 10);

				transporter
					.sendMail({
						from: "m.surenkov@mich-man.ru",
						to: email,
						subject: "Регистрация на портале test-nevatrip",
						text: `Вы успешно зарегистрировались на портале test-nevatrip. Данные для входа: Login: ${email} , Password: ${password}`,
					})
					.then((result) => {
						connection.query(
							"INSERT INTO TOUR_USERS(email, password, role) VALUES(?, ?, ?)",
							[email, hashPassword, "visitor"],
							(error, data) => {
								if (error) {
									return res.status(400).json({ message: "Ошибка отправки данных" });
								}
								console.log(data);
								eventBarCode = String(body.event_id) + String(data.insertId) + String(count);
								userId = data.insertId;
								count++;
								const date = new Date();
								let ticketsArr = [];
								let ticketTypesArr = [
									"ticket_adult_quantity",
									"ticket_kid_quantity",
									"ticket_preferential_quantity",
									"ticket_group_quantity",
								];

								for (let i = 0; i < ticketTypesArr.length; i++) {
									for (let j = 0; j < body[ticketTypesArr[i]]; j++) {
										let barcode = eventBarCode + String(i) + String(j);
										let arr = {
											user_id: userId,
											event_barcode: eventBarCode.padStart(8, "0"),
											ticket_type: ticketTypesArr[i],
											ticket_barcode: barcode.padStart(8, "0"),
											event_date: body.equal_date,
											route: body.route,
											ticket_price: body.action_price,
										};
										ticketsArr.push(arr);
									}
								}

								dataArr = [
									+body.event_id,
									body.equal_date,
									+body.action_price,
									+body.ticket_adult_quantity,
									+body.ticket_kid_price,
									+body.ticket_kid_quantity,
									+body.ticket_preferential_price,
									+body.ticket_preferential_quantity,
									+body.ticket_group_price,
									+body.ticket_group_quantity,
									eventBarCode.padStart(8, "0"),
									userId,
									+body.equal_price,
									date.toLocaleString(),
									JSON.stringify(ticketsArr),
								];

								connection.query(
									"INSERT INTO TOUR_TICKETS(event_id, event_date, ticket_adult_price, ticket_adult_quantity, ticket_kid_price, ticket_kid_quantity, ticket_preferential_price, ticket_preferential_quantity, ticket_group_price, ticket_group_quantity, barcode, user_id, equal_price, created, tickets) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
									dataArr,
									(error, data) => {
										if (error) {
											return res.status(400).json({ message: "Ошибка отправки данных" });
										}

										return res.status(200).json(data);
									}
								);
							}
						);
					})
					.then((result) => {})
					.catch((err) => {
						console.log(err);
					});
			} else {
				eventBarCode = String(body.event_id) + String(data[0].user_id) + String(count);
				userId = data[0].user_id;
				console.log(eventBarCode);

				count++;
				const date = new Date();
				let ticketsArr = [];
				let ticketTypesArr = ["ticket_adult_quantity", "ticket_kid_quantity", "ticket_preferential_quantity", "ticket_group_quantity"];

				for (let i = 0; i < ticketTypesArr.length; i++) {
					for (let j = 0; j < body[ticketTypesArr[i]]; j++) {
						let barcode = eventBarCode + String(i) + String(j);
						let arr = {
							user_id: userId,
							event_barcode: eventBarCode.padStart(8, "0"),
							ticket_type: ticketTypesArr[i],
							ticket_barcode: barcode.padStart(8, "0"),
							event_date: body.equal_date,
							route: body.route,
							ticket_price: body.action_price,
						};
						ticketsArr.push(arr);
					}
				}

				dataArr = [
					+body.event_id,
					body.equal_date,
					+body.action_price,
					+body.ticket_adult_quantity,
					+body.ticket_kid_price,
					+body.ticket_kid_quantity,
					+body.ticket_preferential_price,
					+body.ticket_preferential_quantity,
					+body.ticket_group_price,
					+body.ticket_group_quantity,
					eventBarCode.padStart(8, "0"),
					userId,
					+body.equal_price,
					date.toLocaleString(),
					JSON.stringify(ticketsArr),
				];

				connection.query(
					"INSERT INTO TOUR_TICKETS(event_id, event_date, ticket_adult_price, ticket_adult_quantity, ticket_kid_price, ticket_kid_quantity, ticket_preferential_price, ticket_preferential_quantity, ticket_group_price, ticket_group_quantity, barcode, user_id, equal_price, created, tickets) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
					dataArr,
					(error, data) => {
						if (error) {
							return res.status(400).json({ message: "Ошибка отправки данных" });
						}

						return res.status(200).json(data);
					}
				);
			}
		});
		connection.release();
	});
});

module.exports = router;
