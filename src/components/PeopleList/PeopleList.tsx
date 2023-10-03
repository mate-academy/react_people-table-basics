import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person, NamesColumnsTable } from '../../types';
import { User } from '../User';
import { getPreparedPersons } from '../../helpers/getPreparedPersons';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isErrorToGetPeople, setIsErrorToGetPeople] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug = '' } = useParams();

  const isNotPeopleOnServer
    = !people.length
    && !isLoading
    && !isErrorToGetPeople;

  const isErrorMessageVisible = isErrorToGetPeople && !isLoading;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((allPersons) => {
        const PeopleWithRelatives = getPreparedPersons(allPersons);

        setPeople(PeopleWithRelatives);
      })
      .catch(() => {
        setIsErrorToGetPeople(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isErrorMessageVisible && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isLoading && (
          <Loader />
        )}

        {!!people.length && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {NamesColumnsTable.map(name => (
                  <th key={name}>{name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {people.map((person) => {
                return (
                  <User
                    key={person.slug}
                    person={person}
                    selectedUser={slug}
                  />
                );
              })}
            </tbody>
          </table>
        )}

        {isNotPeopleOnServer && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
