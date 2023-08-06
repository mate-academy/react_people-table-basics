import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { FetchError } from './Errors/FetchError';
import { PeopleTable } from './PeopleTable';
import { EmptyData } from './Errors/EmptyData';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch((error) => {
        setIsError(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <PeopleTable
                people={people}
              />

              {isError && <FetchError />}
              {people.length === 0 && !isLoading && <EmptyData />}
            </>
          )}
        </div>
      </div>
    </>
  );
};
