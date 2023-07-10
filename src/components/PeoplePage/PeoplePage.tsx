import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePages = () => {
  const [dataPersons, setDataPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const sortPersons = (persons: Person[]) => {
    return persons.map(person => ({
      ...person,
      mother: persons.find(mom => mom.name === person.motherName),
      father: persons.find(dad => dad.name === person.fatherName),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedPeople = await getPeople();

        setDataPersons(sortPersons(loadedPeople));
      } catch {
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {dataPersons.length && <PeopleTable people={dataPersons} />}

          {!loadError && !isLoading && !dataPersons.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
