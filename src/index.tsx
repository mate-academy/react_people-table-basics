import { render } from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { HomePage, PeoplePage, NotFoundPage } from './components';

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
