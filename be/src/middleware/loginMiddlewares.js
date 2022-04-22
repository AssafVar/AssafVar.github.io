import bcrypt from "bcrypt";
import "dotenv/config";

import mysql from "mysql2";

const DB_USER = process.env.DB_USER;
const DB_HOST= process.env.DB_HOST;
const DB_PASSWORD= process.env.DB_PASSWORD;
const DB_DATABASE= process.env.DB_DATABASE;
const userDB = mysql.createConnection({user:DB_USER,host:DB_HOST,password:DB_PASSWORD,database:DB_DATABASE});

async function userCheckMiddleware(req, res, next) {
  const email = req.body.email;
  userDB.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    (err, result) => {
      if (err) {
        res.send({err});
      } else if (!result.length){
        res.status(401).send("Wrong user name or password");
      } else {
        req.body.hashPassword = result[0].password;
        req.body.nickname = result[0].nickname;
        req.body.firstName = result[0].firstName;
        req.body.lastName = result[0].lastName;
        next();
      }
    });
};

async function passwordCheckMiddleware(req, res, next) {

  const PasswordCompare = await bcrypt.compare(req.body.password,req.body.hashPassword);

      if (!PasswordCompare) {
        res.status(401).send("Wrong user name or password");
      } else {
        next();
      }
}
export default { userCheckMiddleware, passwordCheckMiddleware };
