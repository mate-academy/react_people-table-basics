import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);
  const { slug } = useParams();
  const selectedPerson = slug;

  return (
    <>
      <div>
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && !isLoading && !error && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        <h1 className="title">People Page</h1>

        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
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
                  const getPerson = (personName: string | null) => {
                    const foundedPerson = people.find(
                      p => p.name === personName,
                    );

                    return foundedPerson ? foundedPerson : personName;
                  };

                  const createPerson = (
                    personName: string | null,
                    personSex: string | null,
                  ) => {
                    const human = getPerson(personName);

                    if (!human) {
                      return '-';
                    }

                    if (typeof human !== 'string') {
                      return (
                        <PersonLink
                          person={human}
                          isMother={personSex === 'f'}
                        />
                      );
                    }

                    return personName;
                  };

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning':
                          selectedPerson === person.slug,
                      })}
                    >
                      <td>
                        <PersonLink
                          person={person}
                          isMother={person.sex === 'f'}
                        />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>{createPerson(person.motherName, 'f')}</td>
                      <td>{createPerson(person.fatherName, 'm')}</td>
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
