import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { PeoplePage } from './components/PeoplePage';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
            <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
      <App />
    </Router>,
  );
