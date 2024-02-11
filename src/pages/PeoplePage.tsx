/* eslint-disable import/no-cycle */
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { Error } from '../components/Error';
import { NoPeopleMessage } from '../components/NoPeople';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">

        <div className="box table-container">

          {isLoading && <Loader />}
          {error && <Error error={error} />}
          {people.length > 0 && (
            <PeopleTable people={people} />
          )}

          {!people.length
            && !isLoading
            && !error
            && <NoPeopleMessage />}
        </div>
      </div>
    </>
  );
};
