import { FC, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { ErrorType, PersonType } from '../../types';
import { getPeople } from '../../api';
import { ErrorNotification } from '../../components/ErrorNotification';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [error, setError] = useState(ErrorType.None);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPeople = async () => {
    setIsLoading(true);

    try {
      setError(ErrorType.None);
      const getPeopleList = await getPeople();

      setPeople(getPeopleList);
    } catch {
      setError(ErrorType.WentWrong);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const isEmptyPeopleList = people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            && <Loader />}

          {error && (
            <ErrorNotification
              errorMessage={error}
              onChangeError={setError}
            />
          )}

          {!isLoading
            && isEmptyPeopleList
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {!isEmptyPeopleList
            && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
