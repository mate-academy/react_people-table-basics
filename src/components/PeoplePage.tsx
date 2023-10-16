import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { slugName } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((people) => {
        setPeopleFromServer(people);
        setLoading(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {loading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && peopleFromServer.length < 1 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!loading && (
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
                {peopleFromServer.map(person => {
                  const {
                    name,
                    slug,
                    sex,
                    born,
                    died,
                    motherName,
                    fatherName,
                  } = person;
                  const mother = peopleFromServer
                    .find(possibleMother => possibleMother.name === motherName);
                  const father = peopleFromServer
                    .find(possibleFather => possibleFather.name === fatherName);

                  return (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={classNames({
                        'has-background-warning': slug === slugName,
                      })}
                    >
                      <td>
                        <Link
                          className={
                            sex === 'f' ? 'has-text-danger' : ''
                          }
                          to={`/people/${slug}`}
                        >
                          {name}
                        </Link>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>

                      {mother ? (
                        <td>
                          <Link to={`/people/${mother.slug}`} className="has-text-danger">
                            {mother.name}
                          </Link>
                        </td>
                      ) : (
                        <td>{motherName || '-'}</td>
                      )}

                      {father ? (
                        <td>
                          <Link to={`/people/${father.slug}`}>
                            {father.name}
                          </Link>
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
        </div>
      </div>
    </div>
  );
};
