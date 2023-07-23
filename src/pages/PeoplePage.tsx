import { FC, useState, useEffect } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person, NotificationType } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Notification } from '../components/Notification';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsError(false);

    getPeople()
      .then((peopleData) => {
        const preparedPeople = getPreparedPeople(peopleData);

        setPeople(preparedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleLoaded = !isLoading && !isError;

  const isEmptyPeopleList = peopleLoaded && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <Notification type={NotificationType.LoadingError} />
          )}

          {isEmptyPeopleList && (
            <Notification type={NotificationType.NoPeopple} />
          )}

          {peopleLoaded && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
