import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { PesonRow } from '../PersonRow/PesonRow';

enum ErrorMessages {
  NONE = '',
  DATA = 'Something went wrong',
  NO_PEOPLE = 'There are no people on the server',
}

export const PeoplePage: React.FC = () => {
  const { selectedPerson } = useParams<string>();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.NONE);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        if (peopleFromServer.length === 0) {
          setErrorMessage(ErrorMessages.NO_PEOPLE);

          return;
        }

        const peopleWithParents = getPreparedPeople(peopleFromServer);

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorMessage(ErrorMessages.DATA))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {
            errorMessage && (
              <>
                {errorMessage === ErrorMessages.DATA && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {ErrorMessages.DATA}
                  </p>
                )}
                {errorMessage === ErrorMessages.NO_PEOPLE && (
                  <p data-cy="noPeopleMessage">
                    {ErrorMessages.NO_PEOPLE}
                  </p>
                )}
              </>
            )
          }

          {
            !loading && !errorMessage && (
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
                  {people.map((person) => (
                    <PesonRow
                      key={person.slug}
                      person={person}
                      selectedPerson={selectedPerson}
                    />
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </>
  );
};
