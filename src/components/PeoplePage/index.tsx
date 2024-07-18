import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const { personInfo } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  });

  const findParent = (nameParent: string | null) => {
    return people.find(person => nameParent === person.name);
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!loading && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && people.length !== 0 && (
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
                  ({ name, sex, born, died, fatherName, motherName, slug }) => {
                    const father = findParent(fatherName);
                    const mother = findParent(motherName);

                    return (
                      <tr
                        key={slug}
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': personInfo === slug,
                        })}
                      >
                        <td>
                          <Link
                            className={classNames({
                              'has-text-danger': sex === 'f',
                            })}
                            to={`${slug}`}
                          >
                            {name}
                          </Link>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>
                          {!mother ? (
                            motherName || '-'
                          ) : (
                            <Link
                              className="has-text-danger"
                              to={`${mother.slug}`}
                            >
                              {motherName}
                            </Link>
                          )}
                        </td>
                        <td>
                          {!father ? (
                            fatherName || '-'
                          ) : (
                            <Link to={`${father.slug}`}>{fatherName}</Link>
                          )}
                        </td>
                      </tr>
                    );
                  },
                )}

                {/* <tr data-cy="person">
                <td>
                  <a href="#/people/philibert-haverbeke-1907">
                    Philibert Haverbeke
                  </a>
                </td>

                <td>m</td>
                <td>1907</td>
                <td>1997</td>

                <td>
                  <a
                    className="has-text-danger"
                    href="#/people/emma-de-milliano-1876"
                  >
                    Emma de Milliano
                  </a>
                </td>

                <td>
                  <a href="#/people/emile-haverbeke-1877">Emile Haverbeke</a>
                </td>
              </tr>

              <tr data-cy="person" className="has-background-warning">
                <td>
                  <a href="#/people/jan-frans-van-brussel-1761">
                    Jan Frans van Brussel
                  </a>
                </td>

                <td>m</td>
                <td>1761</td>
                <td>1833</td>
                <td>-</td>

                <td>
                  <a href="#/people/jacobus-bernardus-van-brussel-1736">
                    Jacobus Bernardus van Brussel
                  </a>
                </td>
              </tr>

              <tr data-cy="person">
                <td>
                  <a
                    className="has-text-danger"
                    href="#/people/lievijne-jans-1542"
                  >
                    Lievijne Jans
                  </a>
                </td>

                <td>f</td>
                <td>1542</td>
                <td>1582</td>
                <td>-</td>
                <td>-</td>
              </tr>

              <tr data-cy="person">
                <td>
                  <a href="#/people/bernardus-de-causmaecker-1721">
                    Bernardus de Causmaecker
                  </a>
                </td>

                <td>m</td>
                <td>1721</td>
                <td>1789</td>

                <td>
                  <a
                    className="has-text-danger"
                    href="#/people/livina-haverbeke-1692"
                  >
                    Livina Haverbeke
                  </a>
                </td>

                <td>
                  <a href="#/people/lieven-de-causmaecker-1696">
                    Lieven de Causmaecker
                  </a>
                </td>
              </tr> */}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
