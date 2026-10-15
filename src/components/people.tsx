import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './person';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [focusedSlug, setFocusedSlug] = useState(slug || null);

  useEffect(() => {
    getPeople()
      .then(data => {
        if (data.length > 0) {
          setPeople(data);
        } else {
          setEmptyError(true);
        }
      })
      .catch(error => {
        setIsError(true);
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isLoaded = !isLoading && !isError && !emptyError;

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {emptyError && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {isLoaded && (
              <table
                data-cy="peopleTable"
                className={
                  'table is-striped is-hoverable is-narrow is-fullwidth'
                }
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
                  {people?.map(person => (
                    <PersonLink
                      key={person.slug}
                      person={person}
                      people={people}
                      focusedSlug={focusedSlug}
                      onSelect={setFocusedSlug}
                    ></PersonLink>
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
