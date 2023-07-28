import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { NotificationMessage } from '../../types/NotificationMessage';
import { Notification } from '../Notification/Notification';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [noPeopleOnServer, setNoPeopleOnServer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [
    errorType,
    setErrorType,
  ] = useState<NotificationMessage>(NotificationMessage.noError);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((data) => {
        if (data.length === 0) {
          setNoPeopleOnServer(true);
          setErrorType(NotificationMessage.noPeopleMessage);
        }

        setPeople(data);
        setIsLoading(false);
      })
      .catch(() => {
        setLoadingError(true);
        setErrorType(NotificationMessage.peopleLoadingError);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}
        {!isLoading && (loadingError || noPeopleOnServer) && (
          <Notification type={errorType} />
        )}
        {!isLoading && !loadingError && !noPeopleOnServer && (
          <PeopleTable people={people} />
        )}
      </div>
    </div>
  );
};
