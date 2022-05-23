import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

export default function App() {
  const [email, setEmail] = useLocalStorage<string>('email', '');
  const [password, setPassword] = useLocalStorage<string>('password', '');
  const [isAuthorized, setIsAuthorized]
    = useLocalStorage<boolean>('isAuthorized', false);
  const [data, setData] = useLocalStorage<Data[]>('data', [{
    title: '',
    login: '',
    password: '',
  }]);

  return (
    <div>
      <h1>Passwords manager</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        {(isAuthorized) || (
          <>
            <Link to="/login">Login</Link>
            {' | '}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
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
