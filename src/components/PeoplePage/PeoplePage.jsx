import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/helpers';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer.map(person => ({
        ...person,
        mother: person.motherName,
        father: person.fatherName,
      }))));
  }, []);

  return (
    <div className="content">
      <h1>People table</h1>
      <PeopleTable people={people} />
    </div>
  );
};
