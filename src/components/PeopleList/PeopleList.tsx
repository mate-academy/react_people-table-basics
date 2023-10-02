import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { User } from '../User';
import { findRelative } from '../../helpers/findRelative';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isErrorToGetPeople, setIsErrorToGetPeople] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug = '' } = useParams();
  const selectedUser = people.find(person => person.slug === slug);

  const getPreparedPersons = (persons: Person[]) => {
    return [...persons].map(onePerson => {
      const mother = findRelative('f', onePerson, persons);
      const father = findRelative('m', onePerson, persons);

      return {
        ...onePerson,
        mother,
        father,
      };
    });
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((allPersons) => {
        const PeopleWithRelatives = getPreparedPersons(allPersons);

        setPeople(PeopleWithRelatives);
      })
      .catch((error) => {
        setIsErrorToGetPeople(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isErrorToGetPeople && !isLoading && (
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
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map((person) => {
                return (
                  <User
                    key={person.slug}
                    person={person}
                    selectedUser={selectedUser}
                  />
                );
              })}
            </tbody>
          </table>
        )}

        {(!people.length && !isLoading) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
