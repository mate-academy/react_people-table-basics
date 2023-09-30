import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPrepearedPeople } from '../../utils/getPrepearedPeople';

export const PeoplePage = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const shouldPeopleBeShown = !hasError && !isLoading;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(currentPeople => {
        const peopleWithParents = getPrepearedPeople(currentPeople);

        setPeople(peopleWithParents);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

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
          {shouldPeopleBeShown && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
