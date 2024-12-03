import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './index.scss';
import { Root } from './Root';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<Root />);
