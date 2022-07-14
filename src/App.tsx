import {
  useState,
  FC,
  memo,
  useEffect,
} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { Header } from './components/Header/Header';
import { getPeople } from './api';

const App: FC = memo(
  () => {
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(
      () => {
        const loadPeople = async () => {
          const loadedPeople = getPeople().then(peopleData => peopleData);

          setPeople(await loadedPeople);
        };

        loadPeople();
      }, [],
    );

    return (
      <div className="App">
        <Header />

        <main className="App__main">
          <Routes>
            <Route
              path="/"
              element={(
                <>
                  <h1>Home Page</h1>
                </>
              )}
            />

            <Route
              path="/people"
              element={(
                <>
                  <h1>People page</h1>
                  <div className="App__table">
                    <PeopleTable people={people} />
                  </div>
                </>
              )}
            />

            <Route
              path="/home"
              element={<Navigate to="/" />}
            />

            <Route
              path="*"
              element={(
                <>
                  <h1>Page Not Found</h1>
                </>
              )}
            />
          </Routes>
        </main>
      </div>
    );
  },
);

export default App;
