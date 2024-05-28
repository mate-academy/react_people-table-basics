import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './Peopletable';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  console.log(people);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emptyResponseMessage, setEmptyResponseMessage] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();
        if(peopleFromServer.length === 0) {
          setEmptyResponseMessage('There are no people on the server')
        }
        setPeople(peopleFromServer);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {emptyResponseMessage&& (
            <p data-cy="noPeopleMessage">{emptyResponseMessage}</p>
          )}

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
