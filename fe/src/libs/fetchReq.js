import axios from "axios";

const postLogin = async (email,password) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const postSignup = async (firstName,lastName,email,nickname,password,confirmPassword) => {
    try {
      const response = await axios.post("http://localhost:8080/signup", {
        firstName,
        lastName,
        email,
        nickname,
        password,
        confirmPassword
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  export default {postLogin,postSignup};