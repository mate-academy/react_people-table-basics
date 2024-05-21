import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsHiding(true);
    getPeople()
      .then(peopless => {
        setPeoples(peopless);
        setIsHiding(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {peoples.length === 0 && !isError && !isHiding && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isHiding && (
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
                {peoples.map(people => (
                  <PersonLink
                    person={people}
                    key={people.slug}
                    peoples={peoples}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
