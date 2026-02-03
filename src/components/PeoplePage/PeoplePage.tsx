import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';

export const PeoplePage = () => {
  const { humanId } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && people.length > 0 && (
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
                {people.map(human => {
                  const motherPerson =
                    people.find(p => p.name === human.motherName) || null;

                  const fatherPerson =
                    people.find(p => p.name === human.fatherName) || null;

                  return (
                    <tr
                      key={human.slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': human.slug === humanId,
                      })}
                    >
                      <td>
                        <PersonLink person={human} />
                      </td>

                      <td>{human.sex}</td>
                      <td>{human.born}</td>
                      <td>{human.died}</td>

                      <td>
                        {human.motherName ? (
                          motherPerson ? (
                            <PersonLink person={motherPerson} />
                          ) : (
                            human.motherName
                          )
                        ) : (
                          '-'
                        )}
                      </td>

                      <td>
                        {human.fatherName ? (
                          fatherPerson ? (
                            <PersonLink person={fatherPerson} />
                          ) : (
                            human.fatherName
                          )
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
    </>
  );
};
