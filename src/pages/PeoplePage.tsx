import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Link, useParams } from 'react-router-dom';
import { PersonLink } from '../components/PersonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
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
                  {people.map(person => {
                    const mother =
                      people.find(p => p.name === person.motherName) || null;

                    const father =
                      people.find(p => p.name === person.fatherName) || null;

                    return (
                      <tr
                        key={person.slug}
                        data-cy="person"
                        className={
                          person.slug === slug
                            ? 'has-background-warning'
                            : undefined
                        }
                      >
                        <td>
                          <Link
                            to={`/people/${person.slug}`}
                            className={
                              person.sex === 'f' ? 'has-text-danger' : undefined
                            }
                          >
                            {person.name}
                          </Link>
                        </td>
                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>

                        <td>
                          <PersonLink
                            person={mother}
                            name={person.motherName}
                          />
                        </td>
                        <td>
                          <PersonLink
                            person={father}
                            name={person.fatherName}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
