import express from "express";
import "dotenv/config";
import gameRoutes from "./routes/gameRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/",gameRoutes);

app.listen(8080, () => {
  console.log(`Listening to port 8080`);
});
