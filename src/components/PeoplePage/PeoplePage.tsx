import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoader, setPeopleLoader] = useState(true);
  const [error, setError] = useState(false);

  const { slugL } = useParams();

  const loadPeople = async () => {
    try {
      setError(false);
      setPeopleLoader(true);
      const load = await getPeople();

      setPeople(load);
    } catch {
      setError(true);
    }

    setPeopleLoader(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const personLink = (name: string | null) => {
    const foundPerson = people.find(person => person.name === name);

    return foundPerson ? foundPerson.slug : null;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {peopleLoader && (
            <Loader />
          )}

          {error && !peopleLoader && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !error && !peopleLoader && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!peopleLoader && (
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
                {people.map(({
                  name,
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  slug,
                }) => (
                  <tr
                    key={name}
                    data-cy="person"
                    className={cn(
                      { 'has-background-warning': slugL === slug },
                    )}
                  >
                    <td>
                      <Link
                        to={`/people/${slug}`}
                        className={cn(
                          { 'has-text-danger': sex === 'f' },
                        )}
                      >
                        {name}
                      </Link>
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    {personLink(motherName) ? (
                      <td>
                        <Link
                          to={`/people/${personLink(motherName)}`}
                          className="has-text-danger"
                        >
                          {motherName || '-'}
                        </Link>
                      </td>
                    ) : (
                      <td>
                        {motherName || (
                          '-'
                        )}
                      </td>
                    )}
                    {personLink(fatherName) ? (
                      <td>
                        <Link
                          to={`/people/${personLink(fatherName)}`}
                        >
                          {fatherName || '-'}
                        </Link>
                      </td>
                    ) : (
                      <td>
                        {fatherName || (
                          '-'
                        )}
                      </td>
                    )}
                  </tr>
                ))}

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
                    <a href="#/people/emile-haverbeke-1877">
                      Emile Haverbeke
                    </a>
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
