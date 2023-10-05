import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';

export const People: React.FC = () => {
  const [people, setPeople] = useState([] as Person[]);
  const { personSlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => setPeople(response))
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isAnchorHere = (anchorName: string | null): Person | undefined => {
    if (anchorName) {
      return people.find(person => person.name === anchorName);
    }

    return undefined;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="box table-container">
            {isLoadingError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {(people.length === 0 && !isLoadingError) && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              {(people.length > 0) && (
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
                {people.map((person) => {
                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning':
                          isSelected && person.slug === personSlug,
                      })}
                    >
                      <td>
                        <Link
                          to={`/people/${person.slug}`}
                          className={classNames({
                            'has-text-danger': person.sex === 'f',
                          })}
                          onClick={() => setIsSelected(true)}
                        >
                          {person.name}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>
                        {isAnchorHere(person.motherName) ? (
                          <Link
                            to={`/people/${isAnchorHere(person.motherName)?.slug}`}
                            className={classNames({
                              'has-text-danger': person.sex === 'f',
                            })}
                            onClick={() => setIsSelected(false)}
                          >
                            {isAnchorHere(person.motherName)?.name}
                          </Link>
                        ) : (
                          <>
                            {person.motherName}
                          </>
                        )}
                      </td>
                      <td>
                        {isAnchorHere(person.fatherName) ? (
                          <Link
                            to={`/people/${isAnchorHere(person.fatherName)?.slug}`}
                            className={classNames({
                              'has-text-danger': person.sex === 'f',
                            })}
                          >
                            {isAnchorHere(person.fatherName)?.name}
                          </Link>
                        ) : (
                          <>
                            {person.fatherName}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>

      )}
    </>
  );
};
