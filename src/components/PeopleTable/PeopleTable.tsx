import { useCallback, useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';
import { getPeople } from '../../api';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const findPeopleWithParents = (peopleFromServer: Person[]) => {
    const peopleWithParents = peopleFromServer.map(child => {
      const mother = peopleFromServer.find(
        parent => parent.name === child.motherName,
      );
      const father = peopleFromServer.find(
        parent => parent.name === child.fatherName,
      );

      return {
        ...child,
        mother,
        father,
      };
    });

    setPeople(peopleWithParents);
  };

  const fetchPeople = useCallback(async () => {
    try {
      await getPeople().then(data => findPeopleWithParents(data));
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(people !== null && people.length === 0) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {isLoading
          ? (<Loader />)
          : (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
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

              <tbody>
                {people?.map(person => (
                  <PersonInfo
                    person={person}
                    key={person.slug}
                  />
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
