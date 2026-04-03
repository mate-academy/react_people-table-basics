import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';

export const TablePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { personId } = useParams();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await getPeople();

        setPeople(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !isError && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length > 0 && (
          <PeopleTable people={people} personId={personId} />
        )}
      </div>
    </div>
  );
};
