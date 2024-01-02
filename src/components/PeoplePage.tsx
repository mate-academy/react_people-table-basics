/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const noErrorAndLoad = !isError && !isLoading;

  const normalizePeople = people.map(person => {
    const father = people.find(parent => person.fatherName === parent.name);
    const mother = people.find(parent => person.motherName === parent.name);

    if (father) {
      person.father = father;
    }

    if (mother) {
      person.mother = mother;
    }

    return person;
  });

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noErrorAndLoad && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {noErrorAndLoad && !!people.length && (
            <PeopleTable people={normalizePeople} />
          )}
        </div>
      </div>
    </>
  );
};
