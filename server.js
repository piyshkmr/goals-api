const express = require("express");
require("dotenv").config();
const connectDB = require("./config/dbConn");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

// to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/goals", require("./routes/goalsRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

// listenning
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
