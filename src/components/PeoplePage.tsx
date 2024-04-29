import { Loader } from './Loader';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { PersonType } from '../types';
import { Person } from './Person';
import { findParents } from '../utils/findParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { personSlug } = useParams();

  const COLUMNS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const isNotPeopleListEmpty = !isLoading && !errorMessage && people.length;
  const isPeopleListEmpty = !isLoading && !errorMessage && !people.length;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        const peopleClone = peopleFromServer.map(person => ({ ...person }));

        const preparedPeople = findParents(peopleClone);

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

          {isPeopleListEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isNotPeopleListEmpty && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {COLUMNS.map(column => (
                    <th key={column}>{column}</th>
                  ))}
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
