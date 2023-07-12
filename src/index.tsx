import ReactDOM from 'react-dom';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { NotFoundRedirect } from './components/NotFoundRedirect';
import { NotFound } from './components/NotFound';
import { Navigate } from './components/Navigate';
import { PeoplePage } from './components/PeoplePage';

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
