import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  function getPeopleTable() {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasErrors(true);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(getPeopleTable, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {isLoading ? (
              <Loader />
            ) : hasErrors ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable peoples={people} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
