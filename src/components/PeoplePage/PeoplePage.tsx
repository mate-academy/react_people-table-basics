import { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  // const { personName } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleList.length === 0 && !loader && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loader && (
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
                  <PersonLink
                    person={person}
                    peopleList={peopleList}
                    key={person.name}
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
