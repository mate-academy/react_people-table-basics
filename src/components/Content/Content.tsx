import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import './Content.scss';
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

type Props = {
  item: Data;
};

type ContextType = {
  data: Data[],
  setData: React.Dispatch<React.SetStateAction<Data[]>>,
};

const Password: React.FC<Props> = ({ item }) => {
  const [type, setType] = useState('password');
  const { data, setData } = useOutletContext<ContextType>();
  const { id } = item;

  const currentItem = data.find((obj: Data) => (obj.id === id)) || data[0];

  const showPassword = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const deleteItem = () => {
    const newData = [...data];

    newData.splice(id - 1, 1);

    newData.map(newItem => {
      // eslint-disable-next-line no-param-reassign
      newItem.id = newData.indexOf(newItem) + 1;

      return newItem;
    });

    setData(newData);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentItem) {
      currentItem.title = event.target.value;

      const newData = [...data];

      newData.splice(id - 1, 1, currentItem);

      setData(newData);
    }
  };

  const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentItem) {
      currentItem.login = event.target.value;

      const newData = [...data];

      newData.splice(id - 1, 1, currentItem);

      setData(newData);
    }
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentItem) {
      currentItem.password = event.target.value;

      const newData = [...data];

      newData.splice(id - 1, 1, currentItem);

      setData(newData);
    }
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Service</Form.Label>
          <Form.Control
            placeholder="Describe what service this data is for"
            value={currentItem.title}
            onChange={changeTitle}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter login"
            value={currentItem.login}
            onChange={changeLogin}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={type}
            placeholder="Enter password"
            value={currentItem.password}
            onChange={changePassword}
          />
          <div className="Content__control">
            <Button
              variant="warning"
              type="button"
              onClick={showPassword}
            >
              Show password
            </Button>

            <Button
              variant="danger"
              onClick={deleteItem}
            >
              X
            </Button>
          </div>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default Password;
