import { createRoot } from 'react-dom/client';
import {
  HashRouter, Route, Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { App } from './App';
import { HomePage } from './routes/HomePage';
import { PeoplePage } from './routes/PeoplePage';
import { NotFound } from './routes/NotFound';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />

            <Route path="*" element={<NotFound />} />
          </>
        </Route>
      </Routes>
    </HashRouter>,
  );
