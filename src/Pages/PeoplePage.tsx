import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeopleFromServer, getPeopleWithParents } from '../services/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);

      try {
        const peopleFromServer = await getPeopleFromServer();

        setPeople(getPeopleWithParents(peopleFromServer));
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Something went wrong');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const isPlugVisible = !isLoading && people.length === 0 && !errorMessage;
  const isListVisible = !isLoading && people.length > 0 && !errorMessage;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isPlugVisible && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {isListVisible && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
