import jwt from "jsonwebtoken";
import "dotenv/config";
import mysql from "mysql2";

const DB_USER = process.env.DB_USER;
const DB_HOST= process.env.DB_HOST;
const DB_PASSWORD= process.env.DB_PASSWORD;
const DB_DATABASE= process.env.DB_DATABASE;
const userDB = mysql.createConnection({user:DB_USER,host:DB_HOST,password:DB_PASSWORD,database:DB_DATABASE});

function getLastScore(req,res,next){
    let info;
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {info =decoded.user});
    userDB.query(
      "SELECT * FROM scores WHERE nickname=?",
      [ info.nickname ],
      (err, result) => {
        if (err) {
          res.status(500).send({ err});
        } else if (result.length) {
          res.send({"lastScore":result[result.length-1].score});
        } else {
          res.send({"lastScore":"none"});
        }
      }
    );
}

function getHighScore(req,res,next){
    let info;
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {info =decoded.user})    
    userDB.query(
      "SELECT score FROM scores WHERE nickname=?",
      [info.nickname],
      (err, result) => {
        if (err) {
          res.send({err});
        } else if (result.length) {
            const min  = result.sort((a,b)=>a.score-b.score)[0].score;
          res.send({"bestScore":min});
        } else {
          res.send({"bestScore":"none"});
        }
      }
    );
}

export default {getLastScore, getHighScore}