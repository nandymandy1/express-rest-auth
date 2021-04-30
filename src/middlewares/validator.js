import { validationResult } from "express-validator";

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errPayload = errors.array().map((err) => err.msg);
    return res.status(400).json({ errors: errPayload });
  }
  next();
};

export default validateMiddleware;
