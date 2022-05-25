import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useLocalStorage from './useLocalStorage';

export default function App() {
  const [email, setEmail] = useLocalStorage<string>('email', '');
  const [password, setPassword] = useLocalStorage<string>('password', '');
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized]
    = useLocalStorage<boolean>('isAuthorized', false);
  const [data, setData] = useLocalStorage<Data[]>('data', [{
    id: 1,
    title: '',
    login: '',
    password: '',
  }]);

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <h1 className="App__title">Passwords manager</h1>
      {(isAuthorized) ? (
        <Button
          variant="light"
          onClick={goToDashboard}
          className="App__dashboard"
        >
          Dashboard
        </Button>
      ) : (
        <div className="App__authorization">
          <Button
            variant="primary"
            onClick={goToLogin}
          >
            Log in
          </Button>

          <Button
            variant="primary"
            onClick={goToRegister}
          >
            Sign up
          </Button>
        </div>
      )}

      <Outlet context={
        {
          email,
          setEmail,
          password,
          setPassword,
          data,
          setData,
          isAuthorized,
          setIsAuthorized,
        }
      }
      />
    </div>
  );
}
