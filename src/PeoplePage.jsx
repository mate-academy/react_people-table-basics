// import React from 'react';
import { useState, useEffect } from 'react';
import { getPeople } from './Api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      });
  }, []);

  return (
    <div className="people_page">
      <h1>People Page</h1>
      <PeopleTable people={people} />
    </div>
  );
};
