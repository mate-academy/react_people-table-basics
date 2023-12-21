import { useEffect, useState } from 'react';
import cn from 'classnames';

import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../utils/api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { findParents } from '../../utils/findParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();

  const hasPeople = !!people.length && !hasError;
  const hasNoPeople = !hasError && !people.length && !isLoading;

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
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) }

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
                      born,
                      died,
                      fatherName,
                      motherName,
                      name,
                      sex,
                      father,
                      mother,
                      slug: personSlug,
                    } = person;

                    return (
                      <tr
                        data-cy="person"
                        className={cn(
                          { 'has-background-warning': slug === personSlug },
                        )}
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
