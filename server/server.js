const express = require("express");
require("dotenv").config();
require("./config/database");

const carRoute = require("./routes/carRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");

const app = express();

app.use(express.json());

app.use("/api/cars/", carRoute);
app.use("/api/users/", userRoute);
app.use("/api/bookings/", bookingRoute);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log("\x1b[36m%s\x1b[0m", `Server is running on port ${port}`)
);
