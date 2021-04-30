import { pick } from "lodash";
import { sign } from "jsonwebtoken";
import { SECRET } from "../constants";
import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  // Hash the password
  this.password = await hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

UserSchema.methods.signJWT = async function () {
  let payload = pick(this, ["_id", "username", "email", "name"]);
  return await sign(payload, SECRET, { expiresIn: "2 days" });
};

UserSchema.methods.getUserInfo = function () {
  return pick(this, ["_id", "username", "email", "name"]);
};

const User = model("users", UserSchema);
export default User;
