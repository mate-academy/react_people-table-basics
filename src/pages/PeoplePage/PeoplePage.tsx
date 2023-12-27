import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { getPersonWithPerents } from '../../helpers/getPersonWithPerents';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { ErrorMessages } from '../../types/ErrorMessages';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => (
        setPeople(getPersonWithPerents(peopleFromServer))
      ))
      .catch(() => setIsError(true))
      .finally(() => setIsLoadingData(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">
        People Page
      </h1>

      <div className="box table-container">

        {isError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {ErrorMessages.NOT_LOADED_PEOPLE}
          </p>
        ) : (
          <>
            {isLoadingData && (
              <Loader />
            )}

            {!isLoadingData && (
              <PeopleTable people={people} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
