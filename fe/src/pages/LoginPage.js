import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.js";
import fetchReq from "../libs/fetchReq.js";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleLogin() {
    setIsLoggingIn(true);
    const response = await fetchReq.postLogin(email, password);
    if (response && response.data.auth) {
      auth.login(response.data.user.nickname,response.data.token);
      navigate("/gamepage");
    } else {
      setIsLoginError(true);
    }
    setIsLoggingIn(false);
  }
  return (
    <div className="w-50 mx-auto mt-5 login-page">
      <h1>Login to play</h1>
      <p>
        or <Link to="/signup">create an account</Link>
      </p>
      {isLoginError && (
        <Alert variant="danger">
          Can't login.Check email or password and try again.
        </Alert>
      )}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            variant="outline-primary"
            type="button"
            onClick={() => handleLogin()}
            disabled={isLoggingIn}
          >
            {`Login `}
            {isLoggingIn && <Spinner animation="border" size="sm" />}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginPage;
