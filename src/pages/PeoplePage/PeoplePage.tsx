import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PageTitle } from '../../components/PageTitle';
import { Table } from '../../components/Table';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPreparedPeople } from '../../utils/getPreparedPeople';
import {
  NOT_FOUND_PEOPLE,
  DOWNLOAD_ERROR_MESSAGE,
} from '../../utils/constants';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isSuccessfullyLoaded = !hasError && !isLoading;

  const fetchPeople = async () => {
    try {
      setHasError(false);
      setIsLoading(true);

      const peopleFromServer = await getPeople();
      const preparedPeople = getPreparedPeople(peopleFromServer);

      setPeople(preparedPeople);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <PageTitle title="People Page" />

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {DOWNLOAD_ERROR_MESSAGE}
              </p>
            )}

          {isSuccessfullyLoaded && !people.length
            && (
              <p data-cy="noPeopleMessage">
                {NOT_FOUND_PEOPLE}
              </p>
            )}

          {isSuccessfullyLoaded && people.length && (
            <Table people={people} />
          )}
        </div>
      </div>
    </>
  );
};
