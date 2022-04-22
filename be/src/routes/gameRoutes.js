import express from "express";
import gameController from "../controllers/gameController.js";
import loginMiddlewares from "../middleware/loginMiddlewares.js";
import userValidMiddleware from "../middleware/userValidMiddleware.js";
import signupMiddleware from "../middleware/signupMiddleware.js";
import addScoreController from "../controllers/addScoreController.js";
import getScoreController from "../controllers/getScoreController.js";
import tokenMiddleware from "../middleware/tokenMiddleware.js";

const router = express.Router();

router
  .route("/signup")
  .post(
    signupMiddleware.isTable,
    userValidMiddleware.userValidation,
    signupMiddleware.uniqueEmailMiddleware,
    signupMiddleware.uniqueNicknameMiddleware,
    signupMiddleware.confirmPasswordMiddleware,
    gameController.addUser,
    tokenMiddleware.createToken
  );
router
  .route("/login")
  .post(
    loginMiddlewares.userCheckMiddleware,
    loginMiddlewares.passwordCheckMiddleware,
    tokenMiddleware.createToken);
router.route("/addScore").post(tokenMiddleware.verifyToken,addScoreController.isScoreTable, addScoreController.addScore);
router.route("/lastScore:id").get(tokenMiddleware.verifyToken,getScoreController.getLastScore);
router.route("/highScore:id").get(tokenMiddleware.verifyToken,getScoreController.getHighScore);

export default router;
