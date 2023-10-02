import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { ERROR_MESSAGE, NO_PEOPLE_ON_SERVER } from '../../utils/constants';
import { addParentsToPeople } from '../../utils/helpers';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = addParentsToPeople(people);

  const noPeopleMessage = (!people.length && !isLoading && !isError);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ERROR_MESSAGE}
            </p>
          )}

          {noPeopleMessage && (
            <p data-cy="noPeopleMessage">
              {NO_PEOPLE_ON_SERVER}
            </p>
          )}

          {!!people.length && (
            <PeopleTable people={peopleWithParents} />
          )}
        </div>
      </div>
    </>
  );
};
