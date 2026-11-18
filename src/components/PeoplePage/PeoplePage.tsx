import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(fetchedPeople => {
        const preparedPeople = fetchedPeople.map(person => ({
          ...person,
          mother: fetchedPeople.find(p => p.name === person.motherName),
          father: fetchedPeople.find(p => p.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
