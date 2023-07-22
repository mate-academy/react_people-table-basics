import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { PageNotFound } from './components/Pages/PageNotFound';
import { App } from './App';
import { HomePage } from './components/Pages/HomePage';
import { PeopleList } from './components/PeopleList';
import { HomeRedirect } from './components/HomeRedirect';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/home',
        element: <HomeRedirect />,
      },
      {
        path: '/people',
        element: <PeopleList />,
      },
      {
        path: '/people/:personSlug',
        element: <PeopleList />,
      },
      {
        path: '/*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export const AppRouting:React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};
