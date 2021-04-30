import { Router } from "express";
import { User } from "../models";
import userAuth from "../middlewares/auth";
import validator from "../middlewares/validator";
import { RegistrationRules, AuthenticationRules } from "../validators";

const router = Router();

// Register a new User
router.post("/register", RegistrationRules, validator, async (req, res) => {
  try {
    let { username, email } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Username already exists.",
      });
    }

    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email is already registred.",
      });
    }

    user = await User.create(req.body);
    let token = await user.signJWT();
    return res.status(201).json({
      token,
      success: true,
      message: "You are now registred.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

// Authenticate a an User
router.post(
  "/authenticate",
  AuthenticationRules,
  validator,
  async (req, res) => {
    try {
      let { username, password } = req.body;
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Username not found.",
        });
      }
      let isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password.",
        });
      }
      let token = await user.signJWT();
      return res.status(201).json({
        token,
        success: true,
        message: "You are now logged in.",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong.",
      });
    }
  }
);

// Get Authenticated User
router.get("/authenticate", userAuth, async (req, res) => {
  return res.status(200).json(req.user);
});

export default router;
