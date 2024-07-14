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

          {!isLoading && !isError && people.length !== 0 && (
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
                {people.map(person => (
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
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
