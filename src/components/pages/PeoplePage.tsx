import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';
import { EmptyComponent } from '../EmptyComponent/EmptyComponent';
import { PeopleComponent } from '../PeopleComponent/PeopleComponent';
import { getPeople } from '../../api';
import { getPreparedPeople } from '../../utils/getPreparedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => {
        setPeople(getPreparedPeople(response));
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isDisplayErrorMessage = errorMessage && !isLoading;
  const isNoPeopleOnServer = !people.length && !isLoading && !errorMessage;
  const isPeopleOnServer = !!people.length && !errorMessage;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {isDisplayErrorMessage && (
          <ErrorComponent errorMessage={errorMessage} />
        )}

        {isNoPeopleOnServer && <EmptyComponent />}

        {isPeopleOnServer && <PeopleComponent people={people} />}
      </div>
    </div>
  );
};
