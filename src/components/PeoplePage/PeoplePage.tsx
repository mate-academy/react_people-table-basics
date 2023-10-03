import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPreparedPeople } from '../../helpers/getPreparedPeople';

export const PeoplePage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const shouldPeopleShown = !isError && !isLoading;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(currentPeople => {
        const peopleWithParents = getPreparedPeople(currentPeople);

        setPeople(peopleWithParents);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {shouldPeopleShown && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
