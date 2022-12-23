import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [isIntialized, setIsIntialized] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      const getParent = (parentName: string | null) => peopleFromServer.find(
        person => person.name === parentName,
      );

      setPeople(peopleFromServer.map(person => ({
        ...person,
        mother: getParent(person.motherName),
        father: getParent(person.fatherName),
      })));
      setIsIntialized(true);
    } catch {
      setHasLoadingError(true);
    } finally {
      setIsIntialized(true);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!isIntialized && (
            <Loader />
          )}

          {isIntialized && hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {isIntialized && !hasLoadingError && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {isIntialized && !hasLoadingError && people.length && (
            <PeopleTable
              people={people}
              selectedPerson={slug || ''}
            />
          )}
        </div>
      </div>
    </>
  );
};
