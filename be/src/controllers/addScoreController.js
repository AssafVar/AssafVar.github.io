import "dotenv/config";
import mysql from "mysql2"

const DB_USER = process.env.DB_USER;
const DB_HOST= process.env.DB_HOST;
const DB_PASSWORD= process.env.DB_PASSWORD;
const DB_DATABASE= process.env.DB_DATABASE;
const userDB = mysql.createConnection({user:DB_USER,host:DB_HOST,password:DB_PASSWORD,database:DB_DATABASE});

function isScoreTable(req,res,next){
  userDB.connect(function(err){
    if (err){
      throw err;
    } else{
      console.log("Connected!");
    }
    let sql = "CREATE TABLE IF NOT EXISTS scores (userID INT PRIMARY KEY AUTO_INCREMENT, nickname VARCHAR(45) NOT NULL, score INT NOT NULL, date VARCHAR(80) NOT NULL) ";
    userDB.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  })
  next();
}
function addScore(req, res, next) {
  const date = new Date().toISOString();
  const nickname = req.body.nickname;
  const score = req.body.score;
  userDB.query(
    "INSERT INTO scores (nickname, score, date) VALUES (?,?,?)",
    [nickname, score, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
            nickname: nickname,
            score: score,
            date: date,
        });
      }
    }
  );
}
export default {addScore,isScoreTable}
