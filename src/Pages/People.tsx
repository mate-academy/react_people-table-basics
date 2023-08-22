// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { Loader } from '../Components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { TablePeople } from '../Components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">

            {loading && (<Loader />)}

            {errorMessage && !loading && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!errorMessage && !loading && people.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {!loading && !errorMessage && people.length > 0 && (
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
                    <TablePeople
                      key={person.slug}
                      people={people}
                      person={person}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>

  );
};
