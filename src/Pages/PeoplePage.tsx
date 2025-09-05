// #region Import

import { Loader } from '../components/Loader';
import { useEffect, useState, useCallback } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../utils/fetchClient';
import { PersonLink } from '../components/PersonLink/PersonLink';

// #endregion

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        const data = await getPeople();

        setPeople(data);
      } catch {
        showError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, [showError]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
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
                  <PersonLink
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
    </>
  );
};
