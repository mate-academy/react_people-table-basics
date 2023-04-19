import React, { useCallback, useEffect, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();
      const processedPeople = peopleFromServer.map(person => {
        const { motherName, fatherName } = person;
        const personCopy = { ...person };

        const mother = peopleFromServer.find(({ name }) => motherName === name);
        const father = peopleFromServer.find(({ name }) => fatherName === name);

        if (mother) {
          personCopy.mother = mother;
        }

        if (father) {
          personCopy.father = father;
        }

        return personCopy;
      });

      setPeople(processedPeople);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="box table-container">
          {!isLoaded && (
            <Loader />
          )}

          {isLoaded && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isLoaded && !errorMessage && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
