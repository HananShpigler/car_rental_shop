const mongoose = require("mongoose");

mongoose
  .connect(process.env.CAR_RENT_MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(
      "\x1b[34m%s\x1b[0m",
      `MongoDB Database connected with HOST: ${con.connection.host}`
    );
  })
  .catch((error) =>
    console.log(
      "\x1b[31m%s\x1b[0m",
      "MongoDB connection error: " + error.message
    )
  );
