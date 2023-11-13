import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleContext } from '../PeopleContext';
import { PeopleList } from '../components/PeopleList';

export const PeoplePage: React.FC = () => {
  const { setPersons } = useContext(PeopleContext);

  // const [errorMessage, setErrorMessage] = useState<string>('');
  const [noPeopleMessage, setNoPeopleMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(person => {
        setPersons(person);
      })
      .finally(() => {
        setLoading(false);
        setNoPeopleMessage('');
      })
      .catch(() => {
        setNoPeopleMessage('There are no people on the server');
      });
  }, []);

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
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

              <PeopleList />
            </table>
          )}

          {/* <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p> */}

          {noPeopleMessage.length > 1 && (
            <p data-cy="noPeopleMessage">
              {noPeopleMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
