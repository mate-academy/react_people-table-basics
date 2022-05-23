import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { useState } from 'react';

export default function Dashboard() {
  const [type, setType] = useState('password');

  const handleClick = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Service</Form.Label>
          <Form.Control placeholder="Describe what service this data is for" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control type="email" placeholder="Enter login" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Enter password</Form.Label>
          <Form.Control type={type} placeholder="Password" />
          <Button
            variant="info"
            type="button"
            onClick={handleClick}
          >
            Show password
          </Button>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Add more
      </Button>
    </Form>
  );
}
