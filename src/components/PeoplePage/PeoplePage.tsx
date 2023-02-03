import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(false);

  const getPeopleFromServer = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      if (!peopleFromServer.length) {
        setError('Something went wrong');
      }

      setPeople(peopleFromServer);
    } catch {
      setError('There are no people on the server');
      setApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        <p data-cy="peopleLoadingError" className="has-text-danger">
          {!apiError && people.length === 0
            ? error
            : ''}
        </p>

        <p data-cy="noPeopleMessage">
          {apiError && error}
        </p>
        {people.length > 0 && <PeopleTable people={people} />}
      </div>
    </div>
  );
};
