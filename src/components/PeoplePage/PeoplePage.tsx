import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleList } from '../PeopleList/PeopleList';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleError, setPeopleError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch (error) {
      setPeopleError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {peopleError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {peopleError}
            </p>
          )}

          {!isLoading && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
