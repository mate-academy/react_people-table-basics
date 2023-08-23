import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PesonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errMess, setErrMess] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrMess(true);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {people === null && errMess === false && (<Loader />)}
        {people !== null && (
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
                <PersonLink
                  key={person.slug}
                  people={people}
                  person={person}
                />
              ))}
            </tbody>
          </table>
        )}

        {errMess && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people !== null && people.length < 1 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

      </div>
    </div>
  );
};
