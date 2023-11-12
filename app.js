require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// middleware
app.use(express.json());

// Sanity Test Route
app.get("/hello", (req, res) => {
  res.send("Api Works");
});

// routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database Connected");
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
