import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { getPreparedPeople } from '../utils/PreparedPeople';
import { PeopleList } from '../PeopleList/PeopleList';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(currentPeople => {
        setPeople(getPreparedPeople(currentPeople));
      })
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleLoadingError = errorMessage && !isLoading;
  const noPeopleMessage = !people.length && !isLoading && !errorMessage;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {peopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!people.length && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
