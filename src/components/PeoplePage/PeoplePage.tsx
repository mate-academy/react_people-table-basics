import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoader(true);

        const result = await getPeople();

        setPeople(result);
      } catch {
        setIsError(true);
      } finally {
        setIsLoader(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoader && !people?.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && !!people.length && (<PeopleTable people={people} />)}
        </div>
      </div>
    </>
  );
};
