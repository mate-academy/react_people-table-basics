import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Title } from '../Title';
import { Loader } from '../Loader';
import { ErrorNotification } from '../ErrorNotification';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types/Person';
import { Error } from '../../types/Error';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPeople = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const peopleList = await getPeople();

      setPeople(peopleList);
    } catch {
      setError(Error.GET_PEOPLE);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetPeople();
  }, []);

  useEffect(() => {
    if (!people.length) {
      setError(Error.NO_PEOPLE);
    } else {
      setError(null);
    }
  }, [people.length]);

  return (
    <>
      <Title
        title="People Page"
      />

      <div className="block">
        <div className="box table-container">
          {isLoading
            && <Loader />}

          {error
            && !isLoading
            && (
              <ErrorNotification
                error={error}
              />
            )}

          {!error
            && !isLoading
            && (
              <PeopleTable
                people={people}
              />
            )}
        </div>
      </div>
    </>
  );
};
