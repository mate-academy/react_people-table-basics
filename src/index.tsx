import { createRoot } from 'react-dom/client';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { PostsProvider } from './PeopleContext';
import { NotFoundPage } from './NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <PostsProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people/:peopleSlug?" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </PostsProvider>,
  );
