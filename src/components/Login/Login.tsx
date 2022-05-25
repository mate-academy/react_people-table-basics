import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './Login.scss';

type ContextType = {
  isAuthorized: boolean,
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>,
};

export default function Login() {
  const [myEmail, setMyEmail] = useState('');
  const [myPassword, setMyPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useOutletContext<ContextType>();

  const handleSubmit = (event: React.FormEvent) => {
    const realEmail = JSON.parse(window.localStorage.getItem('email') || '');
    const realPassword = JSON
      .parse(window.localStorage.getItem('password') || '');

    event.preventDefault();

    if (realEmail === myEmail && realPassword === myPassword) {
      setIsAuthorized(!isAuthorized);
      navigate('/dashboard');
    } else {
      // eslint-disable-next-line no-alert
      alert('Wrong email or password');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setMyEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setMyPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Log in
      </Button>
    </Form>
  );
}
