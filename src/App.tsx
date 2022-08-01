import './App.scss';
import {
  Navigate, NavLink, Route, Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types/Person';
import { PeopleTable } from './components/Peopletable/PeopleTable';
import { PersonInfo } from './components/Personinfo/Personinfo';
import { Page404 } from './components/Page404/Page404';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect((() => {
    getPeople().then(res => {
      if (res) {
        setPeople(res);
      }
    });
  }), []);

  return (
    <div className="App">
      <header className="is-flex is-justify-content-space-evenly">
        <NavLink to="/" className="navbar-item">
          Home
        </NavLink>
        <NavLink to="people" className="navbar-item">
          People
        </NavLink>
      </header>
      <section className="level">
        <div className="level-item">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title level-item">Home Page</h1>}
            />
            <Route
              path="people/*"
              element={(
                <Routes>
                  <Route
                    index
                    element={(
                      <div>
                        <h1 className="title has-text-centered">People</h1>
                        <div className="block" />
                        <PeopleTable people={people} />
                      </div>
                    )}
                  />
                  <Route
                    path=":slug"
                    element={(
                      <div>
                        <h1 className="title has-text-centered">Person Info</h1>
                        <div className="block" />
                        <PersonInfo />
                      </div>
                    )}
                  />
                </Routes>
              )}
            />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </section>

    </div>
  );
};
