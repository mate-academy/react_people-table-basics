import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Errors } from '../types/enums/Errors';
import { groupPeopleParents } from '../utils/people';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      const timerId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [errorMessage]);

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
      })
      .catch(() => {
        setErrorMessage(Errors.General);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const groupedPeople = groupPeopleParents(people);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : people.length > 0 ? (
            <PeopleTable people={groupedPeople} />
          ) : (
            <p data-cy="noPeopleMessage">{Errors.EmptyPeople}</p>
          )}

          {errorMessage.length > 0 && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {Errors.General}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
