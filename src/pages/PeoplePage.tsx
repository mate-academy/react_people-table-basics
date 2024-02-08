import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonTable } from '../components/PersonTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then((r) => {
        setPeople(r);

        if (r.length === 0) {
          setErrorMessage('There are no people on the server');
        }
      })
      .catch(() => setErrorMessage('Something went wrong'));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {errorMessage === 'Something went wrong' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {errorMessage === 'There are no people on the server' && (
            <p data-cy="noPeopleMessage">
              {errorMessage}
            </p>
          )}

          {people ? (
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
                {people.map(person => {
                  const mother = people
                    .find(p => p.name === person.motherName);

                  const father = people
                    .find(p => p.name === person.fatherName);

                  return (
                    <PersonTable
                      person={person}
                      mother={mother}
                      father={father}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};
