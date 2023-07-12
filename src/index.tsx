import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { AppRouting } from './AppRouting';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <AppRouting />,
  );
