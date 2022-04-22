import bcrypt from "bcrypt";
import mysql from "mysql2";

const DB_USER = process.env.DB_USER;
const DB_HOST= process.env.DB_HOST;
const DB_PASSWORD= process.env.DB_PASSWORD;
const DB_DATABASE= process.env.DB_DATABASE;
const userDB = mysql.createConnection({user:DB_USER,host:DB_HOST,password:DB_PASSWORD,database:DB_DATABASE});

async function addUser(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 7);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const nickname = req.body.nickname;

  userDB.query(
    "INSERT INTO users (firstName, lastName, password, email, nickname) VALUES (?,?,?,?,?)",
    [firstName,lastName, hashedPassword, email, nickname],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        req.body.password = hashedPassword;
        next();
      }
    }
  )
}

export default { addUser };
