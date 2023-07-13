import {
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/Home/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/people',
        element: <PeoplePage />,
      },
      {
        path: '/people/:personSlug',
        element: <PeoplePage />,
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
