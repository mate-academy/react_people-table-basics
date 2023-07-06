import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const showNoPeopleMessage = !isError && !people.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {showNoPeopleMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
