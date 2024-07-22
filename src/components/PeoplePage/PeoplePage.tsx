import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleError, setPeopleError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setPeopleError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const isError = !isLoading && peopleError;
  const hasPeople = people.length > 0 && !isLoading;

  const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const FEMALE_SEX = 'f';
  const NO_PARENT_NAME = '-';

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {peopleError}
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {hasPeople && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {tableHeaders.map(header => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                  } = person;

                  const father = people.find(per => per.name === fatherName);
                  const mother = people.find(per => per.name === motherName);

                  return (
                    <tr
                      data-cy="person"
                      className={cn({
                        'has-background-warning': slug === personSlug,
                      })}
                      key={uuidv4()}
                    >
                      <td>
                        <Link
                          to={slug}
                          className={cn({
                            'has-text-danger': sex === FEMALE_SEX,
                          })}
                        >
                          {name}
                        </Link>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>

                      <td>
                        {mother ? (
                          <Link
                            className={cn({ 'has-text-danger': motherName })}
                            to={mother.slug}
                          >
                            {mother.name}
                          </Link>
                        ) : (
                          motherName || NO_PARENT_NAME
                        )}
                      </td>

                      <td>
                        {father ? (
                          <Link to={father.slug}>{father.name}</Link>
                        ) : (
                          fatherName || NO_PARENT_NAME
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
