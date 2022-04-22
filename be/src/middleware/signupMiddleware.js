import "dotenv/config";
import mysql from "mysql2";

const DB_USER = process.env.DB_USER;
const DB_HOST= process.env.DB_HOST;
const DB_PASSWORD= process.env.DB_PASSWORD;
const DB_DATABASE= process.env.DB_DATABASE;
const userDB = mysql.createConnection({user:DB_USER,host:DB_HOST,password:DB_PASSWORD,database:DB_DATABASE});

function isTable(req,res,next){
   userDB.connect(function(err){
    if (err)throw err;
    const sql = "CREATE TABLE IF NOT EXISTS users (userID INT PRIMARY KEY AUTO_INCREMENT, firstName VARCHAR(80), lastName VARCHAR(80), password VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, nickname VARCHAR(45) NOT NULL) ";
    userDB.query(sql, function (err, result) {
      if (err) throw err;
    });
  })
  next();
}

function uniqueEmailMiddleware(req, res, next) {
  const email = req.body.email;
  userDB.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else if (!result.length) {
        next();
      } else {
        res.status(401).send("Email already registered");
      }
    }
  );
}

function uniqueNicknameMiddleware(req, res, next) {
  const nickname = req.body.nickname;
  userDB.query(
    "SELECT * FROM users WHERE nickname =?",
    [nickname],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else if (!result.length) {
        next();
      } else {
        res.status(401).send("Nickname must be unique");
      }
    }
  );
}
function confirmPasswordMiddleware(req, res, next) {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password === confirmPassword) {
    next();
  } else {
    res.status(401).send("Passwords not match");
  }
}
export default {
  isTable,
  uniqueEmailMiddleware,
  uniqueNicknameMiddleware,
  confirmPasswordMiddleware,
};
