/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const { slug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const selected = slug;

  const getPreparedPeople = (peopleFromServer: Person[]): Person[] => {
    return peopleFromServer.map((pers): Person => {
      const mother = peopleFromServer.find(({ name }) => name === pers.motherName);
      const father = peopleFromServer.find(({ name }) => name === pers.fatherName);

      return { ...pers, mother, father };
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => getPreparedPeople(data))
      .then((data) => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && (
        <Loader />
      )}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {people.length === 0 && !isLoading && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      {!!people.length && !isLoading && (
        <PeopleTable people={people} selected={selected} />
      )}
    </>
  );
};
