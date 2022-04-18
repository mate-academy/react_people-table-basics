import { render } from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const rootElement = document.getElementById('root');

render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<HomePage />} />
        <Route path="people" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>,
  rootElement,
);
