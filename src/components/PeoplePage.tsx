/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromApi => {
        setPeople(peopleFromApi);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const getParent = (name: string | null) => {
    return people.find(parent => parent.name === name);
  };

  const peopleWithParents = people.map(person => {
    const mother = getParent(person.motherName);
    const father = getParent(person.fatherName);

    return { ...person, mother, father };
  });

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={peopleWithParents}
        loading={loading}
        errorMessage={errorMessage}
      />
    </div>
  );
};
