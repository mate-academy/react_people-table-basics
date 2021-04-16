import React, { useEffect, useState } from 'react';
import { getPeople } from '../services';
import { PeopleTable } from './PeopleTable';
import './PeoplePage.css';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(false);
  let headerTableData = [];

  useEffect(() => {
    getPeople()
      .then(setPeople, setError(false))
      .catch(e => setError(true));
  }, []);

  if (people.length) {
    headerTableData = (Object.keys(people[0]))
      .filter(el => el !== 'motherName'
        && el !== 'slug'
        && el !== 'fatherName');
  }

  console.log(headerTableData);

  return (
    <div className="PeoplePage">
      <h1>People Page</h1>
      <h2>People table</h2>
      {!error
        ? (
          <PeopleTable
            people={people}
            headerTableData={headerTableData}
          />
        )
        : <p>Something is wrong, try load page later!</p>
      }
    </div>
  );
};
