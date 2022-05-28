import './App.scss';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { getPeople } from './components/api/api';

const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState('');

  const getData = useCallback(async () => {
    try {
      const gottenPeople = await getPeople();

      setPeople(gottenPeople);
      setError('');
    } catch {
      setError('Error');
    }
  }, [people]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people">
          {people
            ? (
              <>
                <PeoplePage />
                <PeopleTable people={people} />
              </>
            )
            : (
              <>
                <p className="title error">
                  {error}
                </p>
              </>
            )}
        </Route>
        <Redirect path="/home" to="/" />
        <NotFoundPage />
      </Switch>
    </div>
  );
};

export default App;
