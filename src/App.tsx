import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable';
import { Header } from './components/Header';
import { getPeople } from './api';
import { Person } from './PersonType';

const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [textError, setTextError] = useState<string>('');

  const getData = useCallback(async () => {
    try {
      const gottenPeople = await getPeople();

      setPeople(gottenPeople);
      setTextError('');
    } catch {
      setTextError('Somthing going wrong. Please try again,');
    }
  }, [people]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" exact>
          <div className="App__home">
            <h1>Home page</h1>
            <p className="App__error">
              {textError}
            </p>
          </div>
        </Route>
        <Route path="/people">
          <PeopleTable
            people={people}
          />
        </Route>
        <Redirect path="/home" to="/" />
        <p className="App__unknown">
          Page not found
        </p>
      </Switch>
    </div>
  );
};

export default App;
