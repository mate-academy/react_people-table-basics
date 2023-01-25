import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../components/Loader';
import { getAll } from '../api/people';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const match = useMatch('/people/:slug');

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const fetchedPeople = await getAll();
        const mappedPeople = fetchedPeople.map(person => {
          return {
            ...person,
            mother:
              fetchedPeople.find(mother => mother.name === person.motherName),
            father:
              fetchedPeople.find(father => father.name === person.fatherName),
          };
        });

        setPeople(mappedPeople);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {isLoading && (
              <Loader />
            )}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {(people.length === 0 && !isError && !isLoading) && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {people.length > 0 && (
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
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={classNames(
                        {
                          'has-background-warning':
                          person.slug === match?.params.slug,
                        },
                      )}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.mother ? (
                          <PersonLink person={person.mother} />
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {person.father ? (
                          <PersonLink person={person.father} />
                        ) : (
                          person.fatherName || '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
