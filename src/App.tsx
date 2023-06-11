import { useEffect, useState } from 'react';
import {
  Route,
  HashRouter,
  Switch,
  useLocation,
} from 'react-router-dom';

import { Loader } from './components/Loader';
import { TableList } from './components/Tabledata.tsx/TableList';
import { Error } from './components/Error/Error';
import { Navbar } from './components/Navbar/Navbar';
import { Person } from './types/Person';

import { getPeople } from './api';

import './App.scss';

export const App = () => {
  const [personData, setApiData] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [clickedNav, setClickedNav] = useState(
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
    if (clickedNav === '/') {
      setApiData([]);
    }

    fetchData();
    setClickedNav(window.location.hash.substr(1) || '/');
  }, [location]);

  useEffect(() => {
    const handlePopstate = () => {
      setClickedNav(window.location.hash.substr(1));
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
          clickedNavs={clickedNav}
          handleNavClick={handleNavClick}
        />
        <main className="section">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <h1 className="title">Home Page</h1>
              </Route>
              <Route path="/people">
                {error && <Error error={error} />}
                {!error && personData.length > 0 && (
                  <TableList personData={personData} />
                )}
                {!error && personData.length === 0 && <Loader />}
              </Route>
              <Route>
                <h1 className="title">Page not found</h1>
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};
