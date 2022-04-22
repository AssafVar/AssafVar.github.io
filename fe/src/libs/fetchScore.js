import axios from "axios";

function postScore(score,token,nickname) {
  axios
    .post(
      "http://localhost:8080/addScore",
      { score, nickname },
      {
        headers: { Authorization: token },
      }
    )
}
const getHighScore = async (nickname) => {
  const token = localStorage.getItem("token");
  const highScore = axios(`http://localhost:8080/lastScore:${nickname}`, {
    headers: { Authorization: token }
  }).then (res=>{
      console.log(res)
  })
  return highScore;
};
export default { postScore, getHighScore };
