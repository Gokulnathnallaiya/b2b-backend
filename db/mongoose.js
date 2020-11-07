const mongoose = require("mongoose");
mongoose.connect(
    process.env.mongo_connection,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      console.log("connected");
    }
  );