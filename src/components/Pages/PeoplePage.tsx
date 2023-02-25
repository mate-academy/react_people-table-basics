import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { personSlug = '' } = useParams();

  const IsTableVisible = Boolean(people.length && !hasErrorMessage);
  const IsTableEmpty = Boolean(
    !people.length && !hasErrorMessage && !isLoading,
  );

  const getPeopleFromServer = async () => {
    setIsLoading(true);
    setHasErrorMessage(false);

    try {
      const receivedPeopleFromServer = await getPeople();

      setPeople(receivedPeopleFromServer);
    } catch {
      setHasErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {hasErrorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {IsTableEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {IsTableVisible && (
            <PeopleTable
              people={people}
              selectedPersonSlug={personSlug}
            />
          )}
        </div>
      </div>
    </div>
  );
};
