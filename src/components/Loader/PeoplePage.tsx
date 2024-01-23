/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from './Loader';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isShowingError, setIsShowingError] = useState(false);

  useEffect(() => {
    setIsShowingError(false);
    getPeople()
      .then(res => {
        setPeople(res.map(person => {
          return {
            ...person,
            mother: res.find(mom => mom.name === person.motherName),
            father: res.find(dad => dad.name === person.fatherName),
          };
        }));
      })
      .catch(() => setIsShowingError(true));
  }, []);

  const isValidData = people && !isShowingError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isShowingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people && !isShowingError && <Loader />}

          {isValidData && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isValidData && people.length !== 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
