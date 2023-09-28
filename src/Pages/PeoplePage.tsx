import { useEffect, useState } from 'react';
import { PeopleList } from '../components/PeopleList';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { Loader } from '../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isLoadedHasNoError = !hasError && !isPeopleLoading;

  useEffect(() => {
    const fetchAndSetPeople = async () => {
      try {
        const peopleFromServer = await getPeople();
        const preparedPeople = getPreparedPeople(peopleFromServer);

        setPeople(preparedPeople);
      } catch {
        setHasError(true);
      } finally {
        setIsPeopleLoading(false);
      }
    };

    fetchAndSetPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && (
            <Loader />
          )}

          {hasError && (
            <p data-cy="peopleLoadingError">Something went wrong</p>
          )}

          {isLoadedHasNoError && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isLoadedHasNoError && people.length && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
