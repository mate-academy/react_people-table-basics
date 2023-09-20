import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';

import { Loader } from '../Loader';
import { PersonRow } from './PersonRow';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const { userId } = useParams();

  function addParents(innerPeople: Person[]) {
    return innerPeople.map(person => {
      const motherOfPerson = innerPeople.find(mother => {
        return mother.name === person.motherName;
      });

      const fatherOfPerson = innerPeople.find(father => {
        return father.name === person.fatherName;
      });

      const parents = { mother: motherOfPerson, father: fatherOfPerson };

      return Object.assign(person, parents);
    });
  }

  useEffect(() => {
    getPeople()
      .then(data => setPeople(addParents(data)))
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

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

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && !loadingError && people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              {!isLoading && (
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
              )}

              <tbody>
                {people.map(
                  person => (
                    <PersonRow
                      key={person.slug}
                      person={person}
                      userId={userId as string}
                    />
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
