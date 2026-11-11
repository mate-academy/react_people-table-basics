import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      setLoadingError(false);

      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading &&
            !loadingError &&
            (people.length > 0 ? (
              <PeopleTable people={people} />
            ) : (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ))}
        </div>
      </div>
    </>
  );
};
