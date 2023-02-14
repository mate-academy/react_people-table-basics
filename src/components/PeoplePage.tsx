import React, { useEffect, useState } from 'react';
import { Errors, getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader/Loader';
import { PeopleTable } from './Peopletable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorLoading, setErrorLoading] = useState('');

  useEffect(() => {
    getPeople()
      .then((peopleData) => (
        setPeople(peopleData)
      ))
      .catch(() => {
        setErrorLoading(Errors.LOADING);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {errorLoading && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {errorLoading}
            </p>
          )}
          {people.length === 0
            ? (
              <>
                <Loader />
                <p
                  data-cy="noPeopleMessage"
                >
                  {Errors.EMPTY}
                </p>
              </>
            )
            : (
              <PeopleTable
                people={people}
              />
            )}
        </div>
      </div>
    </>
  );
};
