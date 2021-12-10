import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Components/HomePage/HomePage';
import { PageNotFound } from './Components/PageNotFound/PageNotFound';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';
import { Menu } from './Components/Menu/Menu';

const App = () => (
  <div className="App">
    <Menu />
    <h1 className="title">
      People table
    </h1>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
