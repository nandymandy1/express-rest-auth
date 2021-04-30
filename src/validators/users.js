import { check } from "express-validator";

const name = check("name", "Name of the user is required.").not().isEmpty();
const username = check("username", "Username is required.").not().isEmpty();
const password = check("password", "Password is required.").isLength({
  min: 6,
});

const email = check("email", "Please enter a valid email address").isEmail();

export const AuthenticationRules = [username, password];
export const RegistrationRules = [name, username, password, email];
