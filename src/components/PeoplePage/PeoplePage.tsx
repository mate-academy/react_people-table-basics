import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoader(true);

        const result = await getPeople();

        setPeople(result);
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loader && !people?.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && people.length && (<PeopleTable people={people} />)}
        </div>
      </div>
    </>
  );
};
