import Ajv from "ajv";
import addFormat from "ajv-formats";
import userSchema from "../data/userSchema.js";

const ajv = new Ajv();
addFormat(ajv);
const validate = ajv.compile(userSchema);
function userValidation(req, res, next) {
  const valid = validate(req.body);
  if (valid) {
    next();
  } else {
    res.status(401).send("Missing required fields");
  }
}

export default {userValidation};