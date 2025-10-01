// src/index.tsx
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './App.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<App />);
