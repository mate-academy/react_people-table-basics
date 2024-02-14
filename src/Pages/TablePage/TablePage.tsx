import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Table } from './Table';

export const TablePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">

          {isLoading && (<Loader />)}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!isLoading && !error) && <Table people={people} />}

        </div>
      </div>
    </>
  );
};
