import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable';

const App = () => (
  <div className="App">
    <nav className="nav">
      <Link className="nav__link" to="/">Home</Link>
      <Link className="nav__link" to="/people">People page</Link>
    </nav>

    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="/people" element={<PeopleTable />} />

      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </div>
);

export default App;
