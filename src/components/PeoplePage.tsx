import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { humanId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isFemale = (sex: string) => sex === 'f';

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && !error ? (
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
                {people.map(human => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                  } = human;

                  const mum =
                    people.find(mum => mum.name === motherName) || null;

                  const papa =
                    people.find(papa => papa.name === fatherName) || null;

                  console.log(mum);

                  return (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={classNames({
                        'has-background-warning': humanId === slug,
                      })}
                    >
                      <td>
                        <Link
                          to={`${slug}`}
                          className={classNames({
                            'has-text-danger': isFemale(sex),
                          })}
                        >
                          {name}
                        </Link>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      {mum ? (
                        <td>
                          <Link to={`${mum.slug}`} className="has-text-danger">
                            {motherName}
                          </Link>
                        </td>
                      ) : (
                        <td>{motherName || '-'}</td>
                      )}
                      {papa ? (
                        <td>
                          <Link to={`${papa.slug}`}>{fatherName}</Link>
                        </td>
                      ) : (
                        <td>{fatherName || '-'}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {error && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
