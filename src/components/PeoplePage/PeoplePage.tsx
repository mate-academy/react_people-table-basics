import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { Table } from '../Table';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((res) => setPeople(res))
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(!isLoading && isError) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (
            <Table people={people} />
          )}
        </div>
      </div>
    </>
  );
};
