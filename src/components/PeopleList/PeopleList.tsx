import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { User } from '../User';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isErrorToGetPeople, setIsErrorToGetPeople] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug = '' } = useParams();
  const selectedUser = people.find(person => person.slug === slug);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch((error) => {
        setIsErrorToGetPeople(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isErrorToGetPeople && isLoading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && (
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
                    people={people}
                    person={person}
                    selectedUser={selectedUser}
                  />
                );
              })}
            </tbody>
          </table>
        )}

        {(!isLoading && !people.length) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
