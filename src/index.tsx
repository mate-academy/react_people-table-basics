import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { People } from './components/People';

const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
        <Route path="people">
          <Route index element={<People />} />
          <Route path=":slug" element={<People />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
