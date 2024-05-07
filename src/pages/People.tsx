import { useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleContext } from '../store/PeopleContext';
import { PersonItem } from '../components/PersonLink';
import { getPeople } from '../api';
import { ErrorText } from '../types/ErrorText';
import { peopleWithParents } from '../util';

export const People = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorText | ''>('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(newPeople => {
        if (newPeople.length === 0) {
          setError(ErrorText.noPeople);
        }

        setPeople(peopleWithParents(newPeople));
      })
      .catch(() => {
        setError(ErrorText.loadingFailed);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setPeople]);

  const displayPeople = !loading && !error;

  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {error === ErrorText.loadingFailed && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {error === ErrorText.noPeople && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {displayPeople && (
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
                    <PersonItem person={person} key={person.slug} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
