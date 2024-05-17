import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Error } from './components/Error';
import { People } from './components/People';
import { App } from './App';
import { Home } from './components/Home';

import React from 'react';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/people',
        element: <People />,
        children: [
          {
            path: ':personSlug',
            element: <People />,
          },
        ],
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <RouterProvider router={router} />,
);
