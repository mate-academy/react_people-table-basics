import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <RouterProvider router={App} />,
);
