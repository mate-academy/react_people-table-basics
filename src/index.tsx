import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={(
            <main style={{ padding: '1rem' }}>
              <p>There is nothing here!</p>
            </main>
          )}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
