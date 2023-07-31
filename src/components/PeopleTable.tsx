import { useEffect, useState } from 'react';
import { Layout } from './Layout';
import { Loader } from './Loader';
import * as peopleService from '../api';
import { Person } from '../types';
import { PersonCard } from './PersonCard';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    peopleService
      .getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="People Page">
      <div className="block">
        <div className="box table-container">

          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !loading && !error && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
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
                {people.map((person) => (
                  <PersonCard
                    key={person.slug}
                    person={person}
                    people={people}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};
