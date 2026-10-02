import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(false);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !errorMessage && people.length > 0 && (
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
                    person.mother ||
                    people.find(p => p.name === person.motherName);
                  const father =
                    person.father ||
                    people.find(p => p.name === person.fatherName);

                  const isSelected = person.slug === slug;

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={isSelected ? 'has-background-warning' : ''}
                    >
                      <td>
                        <Link
                          to={`/people/${person.slug}`}
                          className={
                            person.sex === 'f' ? 'has-text-danger' : ''
                          }
                        >
                          {person.name}
                        </Link>
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {mother ? (
                          <Link
                            to={`/people/${mother.slug}`}
                            className={
                              mother.sex === 'f' ? 'has-text-danger' : ''
                            }
                          >
                            {mother.name}
                          </Link>
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <Link to={`/people/${father.slug}`}>
                            {father.name}
                          </Link>
                        ) : (
                          person.fatherName || '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
