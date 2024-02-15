import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { PeopleProvider } from './PeopleContext';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <PeopleProvider>
      <Root />
    </PeopleProvider>,
  );
