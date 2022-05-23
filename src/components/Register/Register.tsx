import { Form, Button } from 'react-bootstrap';
import { useNavigate, useOutletContext } from 'react-router-dom';

type ContextType = {
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
};

export default function Register() {
  const { setEmail, setPassword } = useOutletContext<ContextType>();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/login');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Create a password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
      >
        Register me
      </Button>
    </Form>
  );
}
