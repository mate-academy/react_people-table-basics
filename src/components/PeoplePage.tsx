import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <main className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">
              {loading && <Loader />}

              {error !== '' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
                <table
                  data-cy="peopleTable"
                  className={`
                  table is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth`}
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

                  <PeopleTable people={people} />
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
