import { Link, Route, Routes } from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="App">
    <h1>Header</h1>

    <nav>
      <Link to="/">Home page</Link>
      {' '}
      <Link to="/people">People page</Link>
    </nav>

    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="people" element={<PeoplePage />} />

      <Route path="*" element={<h1>Home page</h1>} />
    </Routes>
  </div>
);

export default App;
