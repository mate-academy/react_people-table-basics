import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';
import { getFullInfo } from '../../helpers/getFullInfo';
import { ErrorAPI } from '../ErrorAPI/ErrorAPI';
import { NoPeopleMessage } from '../NoPeopleMessage/NoPeopleMessage';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => setPeople(getFullInfo(peopleFromServer)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoadingData(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {hasError ? (
        <ErrorAPI />
      ) : (
        <div className="box table-container">
          {isLoadingData ? (
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

              <tbody>
                {!people.length ? (
                  <NoPeopleMessage />
                ) : (
                  people.map((person) => <PersonLink person={person} />)
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};
