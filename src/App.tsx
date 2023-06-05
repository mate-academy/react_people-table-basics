import { Navigate, Route, Routes} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { NavBar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/home" element={<Navigate to="/" replace />}/>
          <Route path="/people" element={<PeoplePage />}/>
          <Route path="/people/:searchedSlug" element={<PeoplePage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
  )
}
