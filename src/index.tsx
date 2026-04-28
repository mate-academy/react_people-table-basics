import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Router>
      <App />
    </Router>,
  );
}
