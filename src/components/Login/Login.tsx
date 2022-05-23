import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [myEmail, setEmail] = useState('');
  const [myPassword, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    const realEmail = JSON.parse(window.localStorage.getItem('email') || '');
    const realPassword = JSON
      .parse(window.localStorage.getItem('password') || '');

    event.preventDefault();

    if (realEmail === myEmail && realPassword === myPassword) {
      navigate('/dashboard');
    } else {
      // eslint-disable-next-line no-console
      console.log(realEmail, myEmail, realPassword, myPassword);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
