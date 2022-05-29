import './App.scss';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable';

const App = () => (
  <div className="App">
    <nav className="nav">
      <NavLink className="nav__link" to="/">Home</NavLink>
      <NavLink className="nav__link" to="/people">People page</NavLink>
    </nav>

    <Routes>
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="/people" element={<PeopleTable />} />

      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </div>
);

export default App;
