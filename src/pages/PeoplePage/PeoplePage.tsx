import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { findParent } from '../../helpers';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        const loadedPeople = await getPeople();
        const preparedPeople = loadedPeople.map(person => ({
          ...person,
          mother: findParent(loadedPeople, person.motherName),
          father: findParent(loadedPeople, person.fatherName),
        }));

        setPeople(preparedPeople);
      } catch (error) {
        setIsLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading && <Loader />}
          {isLoadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!isLoading && !isLoadError && !people.length) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </p>
          )}

          {!isLoading && !isLoadError && !!people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
