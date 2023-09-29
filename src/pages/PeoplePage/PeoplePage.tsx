import { useEffect, useState } from 'react';

import { Loader } from '../../components/Loader';
import { PeopleList } from '../../components/PeopleList';
import { addParent, getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(addParent(peopleFromServer)))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasErrorMessage = hasError && !isLoading;
  const isPeopleOnServer = !people.length && !hasError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {hasErrorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (<PeopleList people={people} />)}
        </div>
      </div>
    </>
  );
};
