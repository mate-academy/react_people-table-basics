import React, { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setParents = (data: Person[]) => {
    const preparedData = data.map((person) => {
      return {
        ...person,
        father: data.find((f) => f.name === person.fatherName),
        mother: data.find((m) => m.name === person.motherName),
      };
    });

    setPeople(preparedData);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setParents)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} isError={isError} isLoading={isLoading} />
    </>
  );
};
