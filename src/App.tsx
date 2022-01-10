import { Route, Routes, Navigate } from 'react-router-dom';
import { Nav } from './Components/Nav';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';
import { PageNotFound } from './Components/PageNotFound';

const App = () => (
  <div className="App">
    <Nav />
    <Routes>
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
