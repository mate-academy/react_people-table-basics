import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';

const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="*" element={<App />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </HashRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
