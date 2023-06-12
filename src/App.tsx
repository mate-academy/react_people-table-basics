import { useEffect, useState } from 'react';
import {
  Route,
  HashRouter,
  Switch,
  useLocation,
} from 'react-router-dom';

import { TableList } from './components/Tabledata.tsx/TableList';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './components/HomePage/HomePage';
import { InfoPage } from './components/InfoPage/InfoPage';

import { Person } from './types/Person';

import { getPeople } from './api';

import './App.scss';

export const App = () => {
  const [personData, setApiData] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isNavigationClicked, setIsNavigationClicked] = useState(
    window.location.hash.substr(1) || '/',
  );

  const location = useLocation();

  const fetchData = () => {
    getPeople()
      .then((res) => {
        setApiData(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    if (isNavigationClicked === '/') {
      setApiData([]);
    }

    fetchData();
    setIsNavigationClicked(window.location.hash.substr(1) || '/');
  }, [location]);

  useEffect(() => {
    const handlePopstate = () => {
      setIsNavigationClicked(window.location.hash.substr(1));
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const handleNavClick = (route: string) => {
    window.location.hash = route;
  };

  return (
    <HashRouter>
      <div data-cy="app">
        <Navbar
          clickedNavs={isNavigationClicked}
          handleNavClick={handleNavClick}
        />
        <main className="section">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route path="/people">
                <TableList
                  personData={personData}
                  error={error}
                />
              </Route>

              <Route>
                <InfoPage />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};
