import { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchpeople = useCallback(async () => {
    setIsLoading(true);
    setErrorLoading(false);
    try {
      // fetching data
      const fetchedData = await getPeople();
      // setting data to people

      setPeople(fetchedData);
    } catch (error) {
      // error
      setErrorLoading(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchpeople();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorLoading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && !errorLoading && !isLoading && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {people.length > 0 && (
          <PeopleTable people={people} />
        )}
      </div>
    </div>
  );
};
