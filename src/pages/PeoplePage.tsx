import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [arePeopleLoaded, setArePeopleLoaded] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setArePeopleLoaded(true);
    } catch (error) {
      setErrorMessage('Unable to load people');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(woman => woman.name === person.motherName);
    const father = people.find(man => man.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  const isNoPeopleError = !preparedPeople.length && arePeopleLoaded;
  const isLoadedDataExist = preparedPeople && arePeopleLoaded;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isNoPeopleError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoadedDataExist && (
            <PeopleTable people={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
});
