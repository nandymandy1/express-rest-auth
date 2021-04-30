import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import { DB, PORT } from "./constants";
import express, { json } from "express";

import userRoutes from "./routes/users";

const app = express();

app.use(json());
app.use(cors());
app.use(passport.initialize());
require("./middlewares/passport");

app.use("/api/users", userRoutes);

const main = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log("DB_CONNECTED");
    app.listen(PORT, () => console.log(`SERVER_LISTENING_ON: ${PORT}`));
  } catch (err) {
    console.log("SERVER_DOWN", err.message);
  }
};

main();
