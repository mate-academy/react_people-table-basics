import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

export const PersonLink = ({ person }: { person: Person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
);

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    const loadPeople = async () => {
      setIsError(false);
      setIsLoaded(false);

      setTimeout(async () => {
        try {
          const response = await fetch(
            'https://mate-academy.github.io/react_people-table/api/people.json',
          );

          if (!response.ok) {
            throw new Error('Server error');
          }

          const text = await response.text();
          const data = text ? JSON.parse(text) : [];

          setPeople(Array.isArray(data) ? data : []);
          setIsLoaded(true);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }, 0);
    };

    loadPeople();
  }, []);

  return (
    <main className="section">
      <h1 className="title">People Page</h1>

      <div className="container">
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {!isLoading && isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && isLoaded && !isError && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && isLoaded && !isError && people.length > 0 && (
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
                    const father = people.find(
                      toFind => toFind.name === person.fatherName,
                    );
                    const mother = people.find(
                      toFind => toFind.name === person.motherName,
                    );

                    return (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={classNames({
                          'has-background-warning': person.slug === slug,
                        })}
                      >
                        <td>
                          <PersonLink person={person}></PersonLink>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {mother ? (
                            <PersonLink person={mother}></PersonLink>
                          ) : person.motherName ? (
                            person.motherName
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          {father ? (
                            <PersonLink person={father}></PersonLink>
                          ) : person.fatherName ? (
                            person.fatherName
                          ) : (
                            '-'
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
      </div>
    </main>
  );
};
