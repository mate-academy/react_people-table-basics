import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPersonSlug, setPersonSlug] = useState<string | undefined>('');

  useEffect(() => {
    setIsLoading(true);
    getPeople().then(setPeople).catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getParent = (parentName: string | null) => {
    if (parentName && people) {
      return people.find(person => person.name === parentName);
    }

    return undefined;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {error && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}
          {isLoading
            ? (<Loader />)
            : (
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
                  {people?.length !== 0
                    ? people?.map(person => (
                      <>
                        <tr
                          data-cy="person"
                          key={person.slug}
                          className={classNames({
                            // eslint-disable-next-line max-len
                            'has-background-warning': selectedPersonSlug === person.slug
                          },
                          )}
                        >
                          <td>
                            <PersonLink
                              person={person}
                              setSelectedPersonSlug={setPersonSlug}
                            />
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>
                            {getParent(person.motherName) && (
                              <PersonLink
                                person={{
                                  ...person,
                                  mother: getParent(person.motherName),
                                }.mother}
                                setSelectedPersonSlug={setPersonSlug}
                              />
                            )}
                            {person.motherName ? person.motherName : '-'}
                          </td>
                          <td>
                            {getParent(person.fatherName) && (
                              <PersonLink
                                person={{
                                  ...person,
                                  father: getParent(person.fatherName),
                                }.father}
                                setSelectedPersonSlug={setPersonSlug}
                              />
                            )}
                            {person.fatherName ? person.fatherName : '-'}
                          </td>
                        </tr>
                      </>
                    ))
                    : (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                  {/* <tr data-cy="person">
                <td>
                  <a href="#/people/jan-van-brussel-1714">
                    Jan van Brussel
                  </a>
                </td>

                <td>m</td>
                <td>1714</td>
                <td>1748</td>
                <td>Joanna van Rooten</td>
                <td>Jacobus van Brussel</td>
              </tr>

              <tr data-cy="person">
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
