import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleList } from '../../components/PeopleList/PeopleList';

export const PeoplePage = () => {
  const [people, setPeople] = useState<null | Person[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(error => {
        setHasError(true);
        throw new Error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const hasResponse = people && Array.isArray(people);
  const hasNoPeople = hasResponse && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {hasResponse && (hasNoPeople
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            : <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
