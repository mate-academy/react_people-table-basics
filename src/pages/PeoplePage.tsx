import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeopleWithParents } from '../helpers';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadPeople = async () => {
    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch (error) {
      setErrorMessage(`Something went wrong with ${String(error)}`);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const fullPeopleList = getPeopleWithParents(people);

  const isTableEmpty = isLoaded && !errorMessage && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {errorMessage && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {errorMessage}
            </p>
          )}

          {isTableEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoaded
            ? <PeopleTable people={fullPeopleList} />
            : <Loader />}
        </div>
      </div>
    </>
  );
};
