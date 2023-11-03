import { useEffect, useMemo, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

const preparePeople = (people: Person[]): Person[] => {
  return people.map((person) => {
    return {
      ...person,
      motherName: person.motherName || '-',
      fatherName: person.fatherName || '-',
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isDataEmpty = useMemo(() => {
    return !isError && !isLoading && people.length === 0;
  }, [isLoading, isError, people]);

  const isDataPrepared = useMemo(() => {
    return !isError && !isLoading && people.length > 0;
  }, [isLoading, isError, people]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then((response) => setPeople(preparePeople(response)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isDataEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isDataPrepared && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
