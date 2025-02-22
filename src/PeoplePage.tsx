import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { Loader } from './components/Loader';
import { useParams } from 'react-router-dom';
import { PersonLink } from './components/PersonLink/PersonLink';

export const PeoplePage = () => {
  const { peopleId } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const womanNames = useMemo(
    () => people.filter(({ sex }) => sex === 'f').map(({ name }) => name),
    [people],
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        return data.map(d => {
          const mother = data.find(({ name }) => name === d.motherName);
          const father = data.find(({ name }) => name === d.fatherName);

          return { ...d, mother, father };
        });
      })
      .then(setPeople)
      .catch(error => setErr(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {err ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : null}

          {!isLoading && !people.length ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : null}

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
                {people.map(
                  ({
                    slug,
                    name,
                    sex,
                    born,
                    died,
                    motherName,
                    fatherName,
                    mother,
                    father,
                  }) => (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={classNames({
                        'has-background-warning': slug === peopleId,
                      })}
                    >
                      <td>
                        <PersonLink
                          to={`${slug}`}
                          className={classNames({
                            'has-text-danger': womanNames.includes(name),
                          })}
                        >
                          {name}
                        </PersonLink>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>

                      <td>
                        {mother ? (
                          <PersonLink
                            to={mother.slug}
                            className={classNames({
                              'has-text-danger': womanNames.includes(
                                mother.name,
                              ),
                            })}
                          >
                            {mother.name}
                          </PersonLink>
                        ) : (
                          motherName || '-'
                        )}
                      </td>

                      <td>
                        {father ? (
                          <PersonLink to={father.slug}>
                            {father.name}
                          </PersonLink>
                        ) : (
                          fatherName || '-'
                        )}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
