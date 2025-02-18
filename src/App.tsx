import './App.scss';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { PeopleContextProvider } from './components/PeopleContext';

export const App = () => (
  <div data-cy="app">
    <PeopleContextProvider>
      <Header />
      <Main />
    </PeopleContextProvider>
  </div>
);
