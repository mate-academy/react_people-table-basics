import { createRoot } from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';

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
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: 'people/:slug?',
        element: <PeoplePage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<RouterProvider router={router} />);
