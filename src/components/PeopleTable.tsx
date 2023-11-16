import { useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getSlug = (name: string | null) => {
    return people.find(person => person.name === name)?.slug;
  };

  const noPeopleOnServer = !people.length && !isErrorMessage && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isErrorMessage && !isLoading && (
            <p data-cy="peopleisLoadingError" className="has-text-danger">
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

          {noPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
