import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { useMatch } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [noPeopleMessage, setNoPeopleMessage] = useState(false);

  const match = useMatch('/people/:slug');
  const selectedPerson = match?.params.slug ?? null;

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(result => {
        if (result.length === 0) {
          setNoPeopleMessage(true);
        }

        setPeople(result);
      })
      .catch(() => setLoadingError(true))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {loader && <Loader />}

          {noPeopleMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
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
                {people.map(person => (
                  <PersonLink
                    person={person}
                    selectedPerson={selectedPerson}
                    key={person.slug}
                    people={people}
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
