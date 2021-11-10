import React, { useState } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import './App.scss';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

      const response = await axios.get(url);
      setUsers(response.data);
  }

  return (
    <>
      <header>
        <nav className="navigation">
          <button className="button" type="button">
            <a href="/" className="button__link"> Home Page </a>
          </button>

          <button
            className="button"
            type="button"
            onClick={() => getUsers()}
          >
            <a href="/people" className="button__link"> PeoplePage </a>
          </button>
        </nav>
      </header>

      <Switch>
        <Route path="/" exact>
          <h2 className="head">Home Page</h2>
        </Route>

        <Route path="/people" exact>
          <h2 className="head">People Page</h2>
          {users.length > 0 && < PeopleTable users={users} />}
        </Route>

        <p className="notFound">Not Found Page</p>
      </Switch>
    </>
  );
};

export default App;
