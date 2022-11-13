import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleIsLoaded, setPeopleIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setPeopleIsLoaded(true);
    } catch (err) {
      setIsError(true);
      setPeopleIsLoaded(true);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!peopleIsLoaded && (
            <Loader />
          )}

          {peopleIsLoaded && !isError && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleIsLoaded && !isError && (
            (<PeopleTable people={people} />)
          )}
        </div>
      </div>
    </>
  );
};
