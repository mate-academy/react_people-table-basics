import { Loader } from './Loader';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { PersonType } from '../types';
import { Person } from './Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { personSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(person => ({ ...person }));

        preparedPeople.forEach(person => {
          Object.assign(person, {
            mother:
              preparedPeople.find(
                mother => mother.name === person.motherName,
              ) || null,
            father:
              preparedPeople.find(
                father => father.name === person.fatherName,
              ) || null,
          });
        });

        setPeople(preparedPeople);
      })
      .catch(() => setErrorMessage('Unable to load people from server'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {people && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!errorMessage && people && people.length > 0 && (
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
                {people &&
                  people.map(person => (
                    <Person
                      person={person}
                      key={person.slug}
                      personSlug={personSlug}
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
