import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { People } from './pages/People';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { LayoutRouter } from './components/LayoutRouter';

export const App = () => (
  <main className="section">
    <div className="container">
      <Routes>
        <Route path="/" element={<LayoutRouter />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<People />}>
            <Route path=":slug" element={<People />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  </main>
);
