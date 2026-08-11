import { NavBar } from './components/NavBar';
import { Root } from './Root';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <Root />
    </div>
  );
};
