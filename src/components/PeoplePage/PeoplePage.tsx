import { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleContext } from './PeopleContext';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import React from 'react';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  const { state, dispatch } = useContext(PeopleContext);
  const { people } = state;

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPeople()
      .then(data => {
        const updatedPeople = data.map(person => {
          const father = data.find(p => p.name === person.fatherName);
          const mother = data.find(p => p.name === person.motherName);

          return {
            ...person,
            father: father ? { ...father } : undefined,
            mother: mother ? { ...mother } : undefined,
          };
        });

        dispatch({ type: 'load', payload: updatedPeople });
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !people.length && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !error && people.length !== 0 && (
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
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>

                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : (
                        person.fatherName || '-'
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
