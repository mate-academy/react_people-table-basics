import { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';
import { PeopleContext } from './PeopleContext';

export const PeoplePage = () => {
  const { peopleList, setPeopleList } = useContext(PeopleContext);
  const [isLoading, setIsloading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    setLoadingError(false);
    setIsloading(true);

    getPeople()
      .then(people => setPeopleList(people))
      .catch(() => setLoadingError(true))
      .finally(() => setIsloading(false));
  }, [setPeopleList]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loadingError && !peopleList.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!peopleList.length && !isLoading && (
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
                {peopleList.map(person => (
                  <PersonLink person={person} key={person.slug} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
