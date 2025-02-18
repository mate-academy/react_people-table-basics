import { Loader } from '../../components/Loader';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../../components/Loader/PersonLink/PersonLink';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMesssage] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMesssage(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {loading ? (
            <Loader />
          ) : (
            <>
              {!!people.length ? (
                <table
                  data-cy="peopleTable"
                  className="
                  table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth
                "
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
                        person={person}
                        people={people}
                        key={person.slug}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
