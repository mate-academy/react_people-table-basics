import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';

import PeopleTable from '../PeopleTable';
// import { Loader } from '../Loader';

const findParents = (people: Person[]): Person[] => {
  return people.map(person => ({
    ...person,
    mother: people.find(parent => parent.name === person.motherName) || null,
    father: people.find(parent => parent.name === person.fatherName) || null,
  }));
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => findParents(peopleFromServer))
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>People table</h1>
      {isLoading
        ? <p>is Loading</p>
        : <PeopleTable people={people} />}
    </>
  );
};
