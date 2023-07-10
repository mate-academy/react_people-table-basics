import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonRow } from './PersonRow';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getPreparedPeople = (loadedPeople: Person[]) => {
    return loadedPeople.map(person => {
      return {
        ...person,
        mother: people
          .find(person1 => person1.name === person.motherName),
        father: people
          .find(person1 => person1.name === person.fatherName),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch (error) {
        setLoadingError(true);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const preparedPeople = getPreparedPeople(people);

  const emptyData = isLoaded && people.length < 1;
  const failedFetch = loadingError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {failedFetch && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {emptyData && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            {!isLoaded ? <Loader /> : (
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
            )}

            <tbody>
              {preparedPeople.map(person => (
                <PersonRow
                  key={person.slug}
                  person={person}
                />
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
