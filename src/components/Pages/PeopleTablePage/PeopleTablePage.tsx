import { FC, useEffect, useState } from 'react';
import { Loader } from '../../Loader';
import { getPeople } from '../../../api';
import { Person } from '../../../types/Person';
import { PeopleTable } from '../../PeopleTable';
import { preparePeople } from '../../../helpers';

export const PeopleTablePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setPeople(await getPeople());
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const preparedPeople = preparePeople(people);

  const isErrorVisible = !isLoading && isError;
  const isNoPeopleOnServer = !isLoading && !isError && !people.length;
  const isPeopleTableFetched = !isLoading && !isError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}

      {isErrorVisible && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isNoPeopleOnServer && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {isPeopleTableFetched && <PeopleTable people={preparedPeople} />}
    </>
  );
};
