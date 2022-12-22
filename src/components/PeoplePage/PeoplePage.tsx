import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setError('');
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  if (error) {
    return (
      <h1
        data-cy="peopleLoadingError"
        className="title has-text-danger"
      >
        {error}
      </h1>
    );
  }

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {(!isLoading && (
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
                {error}
              </h1>
            )}
        </>
      ))}
    </div>
  );
};
