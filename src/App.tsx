import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AppProvider } from './components/context/AppContext';

export const App = () => (
  <div data-cy="app">
    <AppProvider>
      <Navigation />

      <main className="section">
        <div className="container">
          <Outlet />
          {/* <HomePage /> */}
          {/* <h1 className="title">Page not found</h1> */}
          {/* <PeopleList /> */}
        </div>
      </main>
    </AppProvider>
  </div>
);
