import './App.scss';
import { Navigate, createHashRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/Layout/Layout';

export const App = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },

      {
        path: 'people',
        element: <PeoplePage />,
        children: [
          {
            path: ':slug',
            element: <PeoplePage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
