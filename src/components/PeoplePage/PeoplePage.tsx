/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

interface Error {
  status: boolean,
  message: string,
}

const defaultError = {
  status: false,
  message: '',
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Error>(defaultError);
  const [isLoading, setIsLoading] = useState(true);

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setError(defaultError);
    } catch (e: any) {
      setError({
        status: true,
        message: e.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  if (error.status) {
    return (
      <h1
        data-cy="peopleLoadingError"
        className="title has-text-danger"
      >
        {`Error: ${error.message}`}
      </h1>
    );
  }

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {(!isLoading && !error.status) && (
        <>
          {people.length !== 0
            ? (
              <>
                <h1 className="title">People Page</h1>

                <PeopleTable people={people} />
              </>
            ) : (
              <h1
                data-cy="noPeopleMessage"
                className="title has-text-danger"
              >
                {`Error: ${error.message}`}
              </h1>
            )}
        </>
      )}
    </div>
  );
};
