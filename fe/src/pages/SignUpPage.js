import React, { useState } from "react";
import { Alert, Button, Form, FormLabel, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.js";
import fetchReq from "../libs/fetchReq.js";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isSignupError, setIsSignupError] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();

  async function handleSignup() {
    setIsSignup(true);
    if (password !== confirmPassword) {
      setIsSignupError("Passwords not matching!");
      setIsSignup(false);
    } else {
      const response = await fetchReq.postSignup(
        firstName,
        lastName,
        email,
        nickname,
        password,
        confirmPassword
      );
      if (response && response.data.auth) {
        auth.login(nickname,response.data.auth.token);
        navigate("/gamepage");

    } else {
        setIsSignupError("Email and nickname must be unique!");
      }
      setIsSignup(false);
    }
  }
  return (
    <div className="w-50 mx-auto mt-5 signup-page">
      <Form>
        <h1>Sign Up</h1>
        {isSignupError && <Alert variant="danger">{isSignupError}</Alert>}
        <Form.Group className="mb-3">
          <FormLabel>First name</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormLabel>Last name</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormLabel>Email address</FormLabel>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormLabel>Nickname</FormLabel>
          <Form.Control
            type="text"
            placeholder="Enter nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <FormLabel>Password</FormLabel>
          <Form.Control
            type="password"
            placeholder="Enter password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormLabel>Confirm Password</FormLabel>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            autoComplete="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            type="button"
            variant="outline-primary"
            onClick={handleSignup}
            disabled={isSignup}
          >
            Sign Up
            {isSignup && <Spinner animation="border" size="sm" />}
          </Button>
        </div>

        <p>
          Already registered <Link to="/login">sign in?</Link>
        </p>
      </Form>
    </div>
  );
}
