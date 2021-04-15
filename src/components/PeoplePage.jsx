import React, { useEffect, useState } from 'react';
import { getPeople } from '../services';
import { PeopleTable } from './PeopleTable';
import './PeoplePage.css';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople, setError(false))
      .catch(e => setError(true));
  }, []);

  return (
    <div className="PeoplePage">
      <h1>People Page</h1>
      <h2>People table</h2>
      {!error
        ? <PeopleTable people={people} />
        : <p>Something is wrong, try load page later!</p>
      }
    </div>
  );
};

