import { useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const getSlug = (name: string | null) => {
    return people.find(person => person.name === name)?.slug;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}

          {errorMessage && !loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
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
                { people.map(person => {
                  return (
                    <PersonLink
                      person={person}
                      motherNameLink={getSlug(person.motherName)}
                      fatherNameLink={getSlug(person.fatherName)}
                      key={person.slug}
                    />
                  );
                })}
              </tbody>
            </table>
          )}

          {!people.length && !errorMessage && !loading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
