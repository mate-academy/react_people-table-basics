import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from './Pages/HomePage';
import { NotFound } from './Pages/NotFound/NotFound';
import { PeopleTablePage } from './Pages/PeopleTablePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/people',
        element: <PeopleTablePage />,
        children: [
          {
            path: ':personSlug',
            element: <PeopleTablePage />,
          },
        ],
      },
    ],
  },
]);

export const AppRouting: FC = () => (
  <RouterProvider router={router} />
);
