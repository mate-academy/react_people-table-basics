import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { getPeople } from '../../api/api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleInfo } from '../PeopleInfo/PeopleInfo';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const match = useMatch('/people/:slug');

  const selectedPersonSlug = match?.params.slug;

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
      setIsLoaded(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {people.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoaded && people.length > 0 && (
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
                {people?.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning':
                        person.slug === selectedPersonSlug,
                    })}
                  >
                    <PeopleInfo
                      person={person}
                      people={people}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
