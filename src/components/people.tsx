/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { getPeople } from '../api';
import { MyContext } from './state';
import { Loader } from './Loader';
import { Error } from './error';
import { Person } from './person';
import { Person as PersonType } from '../types';

export const People = () => {
  const { person, setPerson, error, setError, setIsLoading, isLoading } =
    useContext(MyContext);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPerson(fetchedPeople);
      })
      .catch(() => {
        setError('Unable to load people: ');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : person.length === 0 ? (
        <div className="box table-container">
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      ) : (
        <div className="box table-container">
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
              {person.map((pers: PersonType) => {
                return <Person key={pers.slug} pers={pers} />;
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
