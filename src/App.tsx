import {
  Routes, Route, Navigate, Link,
} from 'react-router-dom';

import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <h1>People table using material design</h1>

    <button type="button" className="mdc-button mdc-button--outlined">
      <span className="mdc-button__ripple" />
      <Link to="/" className="mdc-button__label button">Home page</Link>
    </button>

    <button type="button" className="mdc-button mdc-button--outlined">
      <span className="mdc-button__ripple" />
      <Link to="/people" className="mdc-button__label button">People page</Link>
    </button>

    <br />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
    </Routes>
  </div>
);

export default App;
