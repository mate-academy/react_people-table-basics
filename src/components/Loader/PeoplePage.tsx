import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Error } from '../../types/Error';
import { Notification } from '../Notification';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { selectedPerson = '' } = useParams();

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const response = await getPeople();

      if (!response.length) {
        setError({
          message: 'There are no people on the server',
          type: 'noPeopleMessage',
        });
      }

      setPeople(response);
    } catch {
      setError({
        message: 'Something went wrong',
        type: 'peopleLoadingError',
        isDanger: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {people && (
          <PeopleTable
            people={people}
            selectedPerson={selectedPerson}
          />
        )}

        {isLoading && <Loader />}

        {error && <Notification error={error} />}
      </div>
    </>
  );
};
