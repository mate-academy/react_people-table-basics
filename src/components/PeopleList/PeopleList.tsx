import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';

const errorMessages = {
  somethingWentWrong: 'Something went wrong',
  noPeopleOnTheServer: 'There are no people on the server',
};

export const PeopleList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessages.somethingWentWrong}
          </p>
        )}

        {!isLoading && !isError && people.length > 0 && (
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
              {people.map(person => {
                const motherLink = person.motherName
                  ? people.find(el => el.name === person.motherName)?.slug ??
                    null
                  : null;

                const fatherLink = person.fatherName
                  ? people.find(el => el.name === person.fatherName)?.slug ??
                    null
                  : null;

                return (
                  <PersonItem
                    person={person}
                    key={person.slug}
                    motherLink={motherLink}
                    fatherLink={fatherLink}
                  />
                );
              })}
            </tbody>
          </table>
        )}

        {!isLoading && !people.length && !isError && (
          <p data-cy="noPeopleMessage">{errorMessages.noPeopleOnTheServer}</p>
        )}
      </div>
    </div>
  );
};
