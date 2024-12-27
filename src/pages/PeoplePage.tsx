import { useState, useEffect } from 'react';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [tablePeople, setTablePeople] = useState<Person[]>([]);
  const [hasLoading, setHasLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const hasTablePeople = !!tablePeople.length && !hasLoading && !hasError;

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const fetchedPeople = await getPeople();

        setTablePeople(fetchedPeople);
      } catch (error) {
        setHasError(true);
      } finally {
        setHasLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {hasLoading && <Loader />}
          {!hasLoading && hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!tablePeople.length && !hasLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {hasTablePeople && <PeopleTable people={tablePeople} />}
        </div>
      </div>
    </>
  );
};
