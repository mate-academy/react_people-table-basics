/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setParents = (peopleFromServer: Person[]) => {
    const people = peopleFromServer.map((person) => {
      return {
        ...person,
        father: peopleFromServer.find((f) => f.name === person.fatherName),
        mother: peopleFromServer.find((m) => m.name === person.motherName),
      };
    });

    setPeople(people);
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
      <PeopleTable
        people={people}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};
