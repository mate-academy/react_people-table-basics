/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import { PeopleContext } from '../store/PeopleProvider';
import { PersonLink } from '../components/PersonLink';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);
  const { state, dispatch } = useContext(PeopleContext);
  const { people } = state;

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setisError(false);
    getPeople()
      .then(data => {
        data.forEach(person => {
          const father = data.find(p => p.name === person.fatherName);
          const mother = data.find(p => p.name === person.motherName);

          if (father) {
            person.father = father;
          }

          if (mother) {
            person.mother = mother;
          }
        });

        return data;
      })
      .then(data => dispatch({ type: 'load', payload: [...data] }))
      .catch(() => setisError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && people.length === 0 && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && (
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
                {!!people.length &&
                  people.map(person => (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': slug === person.slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>
                        {person.mother ? (
                          <PersonLink person={person.mother} />
                        ) : person.motherName ? (
                          person.motherName
                        ) : (
                          <>{'-'}</>
                        )}
                      </td>

                      <td>
                        {person.father ? (
                          <PersonLink person={person.father} />
                        ) : person.fatherName ? (
                          person.fatherName
                        ) : (
                          <>{'-'}</>
                        )}
                      </td>
                    </tr>
                  ))}
                {/* <tr data-cy="person">
                <td>
                  <a href="#/people/jan-van-brussel-1714">Jan van Brussel</a>
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
    </div>
  );
};
