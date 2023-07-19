import { render } from 'react-dom';
import { Root } from './Root';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

const root = document.getElementById('root') as HTMLElement;

render(<Root />, root);
