import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PersonLink } from '../Person/PersonLink';
import { Loader } from '../Loader';

export const People = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { personSlug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && hasError
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {(!isLoading && !hasError) && (
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
                {!people.length && !isLoading
                  ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )
                  : people.map(person => (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={cn({
                        'has-background-warning': personSlug === person.slug,
                      })}
                    >
                      <PersonLink
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
