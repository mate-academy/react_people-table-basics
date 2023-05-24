import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const { personSlug } = useParams();

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map((person) => {
        const mother = peopleFromServer
          .find(mom => mom.name === person.motherName);
        const father = peopleFromServer
          .find(mom => mom.name === person.fatherName);

        return {
          ...person,
          mother,
          father,
        };
      });

      setIsLoading(false);

      if (peopleFromServer.length === 0) {
        setIsError('Can not find people to show');
      }

      setPeople(peopleWithParents);
    } catch {
      setIsError('Oops, something is wrong...');
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (
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
                {people.map(person => (
                  <PersonLink
                    key={person.slug}
                    person={person}
                    personSlug={personSlug}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
