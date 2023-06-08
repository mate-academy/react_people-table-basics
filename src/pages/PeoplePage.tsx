import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Loader/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const getAllPeople = async () => {
    setLoading(true);
    try {
      const todosFromServer = await getPeople();

      setPeople(todosFromServer);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <div className="block">
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

        {!isLoading && !isError && people.length > 0 && (
          <PeopleTable people={people} />
        )}

      </div>
    </div>

  );
};
