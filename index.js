const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const { application } = require("express");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection succesfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth/", authRoute);
app.use("/api/user", userRoute);
app.get("/", (req, res) => {
  res.send("Route");
});

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
