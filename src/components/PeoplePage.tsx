import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const params = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const selected = params.slug ? params.slug : '';

  const matchMotherAndFather = (peopleFromServer: Person[]): Person[] => {
    return peopleFromServer.map((per): Person => {
      const mother = peopleFromServer.find(
        person => person.name === per.motherName,
      );

      const father = peopleFromServer.find(
        person => person.name === per.fatherName,
      );

      return { ...per, mother, father };
    });
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => matchMotherAndFather(data))
      .then((data) => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loading && (
        <Loader />
      )}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {people.length === 0 && !loading && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      {people.length !== 0 && !loading && (
        <PeopleTable people={people} selected={selected} />
      )}
    </>
  );
};
