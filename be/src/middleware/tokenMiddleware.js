import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

async function createToken(req, res, next) {
const hashedPassword = await bcrypt.hash(req.body.password,7);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    nickname: req.body.nickname,
    email: req.body.email,
  };
  jwt.sign(
    { user },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
    (err, token) => {
      res.json({auth:true, token, user });
    }
  );
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.send("not valid token");
    } else {
      next();
    }
  });
}
export default { createToken, verifyToken };
