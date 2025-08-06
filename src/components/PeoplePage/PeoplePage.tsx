import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useLocation } from 'react-router-dom';
import { PersonLink } from '../PersonLink';

export const PeoplePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const activeSlug = location.pathname.split('/').at(-1);

  const nameToPersonMap = people.reduce(
    (map, person) => ({
      ...map,
      [person.name]: person,
    }),
    {} as Record<string, Person>,
  );

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        const response = await getPeople();

        setPeople(response);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !error && people.length > 0 && (
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
                    data-cy="person"
                    key={person.slug}
                    className={
                      activeSlug === person.slug
                        ? 'has-background-warning'
                        : undefined
                    }
                  >
                    <td>{<PersonLink person={person} />}</td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? (
                        Object.hasOwn(nameToPersonMap, person.motherName) ? (
                          <PersonLink
                            person={nameToPersonMap[person.motherName]}
                          />
                        ) : (
                          person.motherName
                        )
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {person.fatherName ? (
                        Object.hasOwn(nameToPersonMap, person.fatherName) ? (
                          <PersonLink
                            person={nameToPersonMap[person.fatherName]}
                          />
                        ) : (
                          person.fatherName
                        )
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
