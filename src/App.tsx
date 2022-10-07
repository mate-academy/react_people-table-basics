import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { getPeople } from './api';
import { Person } from './types';
import { TodoPage } from './components/TodoPage';
import { PageNavLink } from './components/PageNavLink';
import { MessageBlock } from './components/MessageBlock';

export const App = () => {
  const [peopleTable, setPeopleTable] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeopleTable(peopleFromServer.map(persone => {
          return ({
            ...persone,
            mother: peopleFromServer
              .find(mother => persone.motherName === mother.name),

            father: peopleFromServer
              .find(father => persone.fatherName === father.name),
          });
        }));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <PageNavLink
              to="/"
              text="Home"
              end
            />
            <PageNavLink
              to="/people"
              text="People"
            />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            >
              <Route
                path="home"
                element={<Navigate to="/" replace />}
              />
            </Route>

            <Route path="/people">
              <Route index element={<TodoPage peopleTable={peopleTable} />} />
              <Route
                path=":slug"
                element={<TodoPage peopleTable={peopleTable} />}
              />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>

          {
            (isError || isLoading)
            && (
              <MessageBlock
                isError={isError}
                isLoading={isLoading}
                peopleTable={peopleTable}
              />
            )
          }
        </div>
      </main>
    </div>
  );
};
