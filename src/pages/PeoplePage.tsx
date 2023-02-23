import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { getParent } from '../components/utils/GetParent';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(loadedPeople => {
        const preparedPeople = loadedPeople.map(person => ({
          ...person,
          mother: getParent(loadedPeople, person.motherName),
          father: getParent(loadedPeople, person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => setIsLoadError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <PeopleTable people={people} />
          )}

          {isLoadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !people.length && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </p>
          )}
        </div>
      </div>
    </>
  );
};
