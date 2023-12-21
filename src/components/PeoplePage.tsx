import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

const findParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();

  const hasPeople = !!people.length && !hasError;
  const hasNoPeople = !people.length && !hasError && !isLoading;

  useEffect(() => {
    (async () => {
      try {
        const response = await getPeople();

        setPeople(findParents(response));
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {hasPeople && (
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
                {
                  people.map(person => {
                    const {
                      name,
                      sex,
                      born,
                      died,
                      father,
                      mother,
                      fatherName,
                      motherName,
                      slug: personSlug,
                    } = person;

                    return (
                      <tr
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': slug === personSlug,
                        })}
                        key={name}
                      >
                        <td>
                          <PersonLink person={person}>
                            {name}
                          </PersonLink>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>
                          <PersonLink person={mother}>
                            {motherName ?? '-'}
                          </PersonLink>
                        </td>
                        <td>
                          <PersonLink person={father}>
                            {fatherName ?? '-'}
                          </PersonLink>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
