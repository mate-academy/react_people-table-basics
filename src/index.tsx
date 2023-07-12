import ReactDOM from 'react-dom';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundRedirect } from './pages/NotFoundRedirect';
import { NotFound } from './pages/NotFound';
import { Navigate } from './pages/Navigate';
import { PeoplePage } from './pages/PeoplePage';

const router = createHashRouter([
  {
    path: '/home',
    element: <Navigate />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundRedirect />,
    children: [
      {
        path: 'some/not/existing/page',
        element: <NotFound />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/people',
        element: <PeoplePage />,
        children: [
          {
            path: ':slug',
            element: <PeoplePage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root'),
);
