const express = require("express");
const cors = require("cors");
const router = require("./routes/bd.routes");
// const path = require("path");

const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

const app = express();
const port = 5000;

app.use(express.json({ extended: true }));

app.use(cors(corsOptions));

app.use("/", router);

app.listen(port, () => {
	console.log("Hello");
});
