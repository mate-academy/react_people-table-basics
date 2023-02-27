import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeopleWithParents } from '../../utils/getPeopleWithParents';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasLoadingError, sethasLoadingError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const peopleFromServer = async () => {
    try {
      setIsLoading(true);

      const fetchPeople = await getPeople();
      const fetchedPeople = getPeopleWithParents(fetchPeople);

      setPeople(fetchedPeople);
    } catch {
      sethasLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    peopleFromServer();
  }, []);

  const isPeopleVisible = !isLoading && Boolean(people.length);
  const isPeopleMessageVisible = !isLoading && !people.length;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {hasLoadingError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isPeopleVisible && (
          <PeopleTable people={people} />
        )}

        {isPeopleMessageVisible && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
