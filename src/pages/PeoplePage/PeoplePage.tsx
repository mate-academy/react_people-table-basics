import { useEffect, useState } from 'react';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialLoad = async () => {
      try {
        setPeople(await getPeople());
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    initialLoad();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading
            ? <Loader />
            : (
              <>
                {error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!people.length && !isLoading
                  ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )
                  : <PeopleTable people={people} />}
              </>
            )}
        </div>
      </div>
    </>
  );
};
