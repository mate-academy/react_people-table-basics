import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route, RouterProvider, createHashRouter, createRoutesFromElements,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { App } from './App';
import { HomePage } from './routes/HomePage';
import { PeoplePage } from './routes/PeoplePage';
import { NotFound } from './routes/NotFound';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":userSlug/" element={<PeoplePage />} />
      </Route>
      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <RouterProvider router={router} />,
  );
