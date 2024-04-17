import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Actions, DispatchContext, StateContext } from '../../Store';
import { Person } from '../../types';
import { PersonLink } from '../Person';

export const People: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { people, errorMessage } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        dispatch({ type: Actions.getPeople, people: response });
        setIsLoading(false);
      })
      .catch(error => {
        dispatch({
          type: Actions.setErrorMessage,
          errorMessage: 'Something went wrong',
        });

        throw error;
      });
  }, [dispatch]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && !errorMessage && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {people.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && !isLoading && (
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
                {people.map((person: Person) => {
                  const { slug } = person;

                  return <PersonLink key={slug} person={person} />;
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
