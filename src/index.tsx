import { createRoot } from 'react-dom/client';
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'people',
        children: [
          {
            index: true,
            element: <PeoplePage />,
          },
          {
            path: ':slug',
            element: <PeoplePage />,
          },
        ],
      },
    ],
  },
  {
    path: 'home',
    element: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <RouterProvider router={router} />,
  );
