import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  const loadPeople = async () => {
    try {
      setIsLoading(true);

      const loadedPeople = await getPeople();

      setPeople(loadedPeople.map(person => ({
        ...person,
        mother: loadedPeople.find(parent => parent.name === person.motherName),
        father: loadedPeople.find(parent => parent.name === person.fatherName),
      })));
    } catch {
      setHasError(true);
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

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && people.length > 0 && (
            <PeopleTable
              slug={slug}
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};
