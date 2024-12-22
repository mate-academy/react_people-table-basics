/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { Person } from './types';
import { TableComponent } from './components/TableComponent';
import { getPeople } from './api';

export function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  function fetchPeople() {
    getPeople().then(person => {
      person ? setPeople(person) : setIsLoadingError(true);
    })
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchPeople();
    setIsLoading(true);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <TableComponent people={people} isLoadingError={isLoadingError} />
          )}
        </div>
      </div>
    </>
  );
}
