import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

export const People = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleData = async () => {
    setIsLoading(true);
    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getFaterSlug = (person: Person) => {
    const searchedGuy = people.find(
      somebody => somebody.name === person.fatherName,
    );

    return searchedGuy?.slug || '';
  };

  const getMotherSlug = (person: Person) => {
    const searchedWoman = people.find(
      somebody => somebody.name === person.motherName,
    );

    return searchedWoman?.slug || '';
  };

  useEffect(() => {
    getPeopleData();
  }, []);

  const { selected } = useParams<{ selected: string }>();
  const selectedPerson = selected || '';

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && people.length > 0 && (
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
                    key={person.name}
                    person={person}
                    selectedPerson={selectedPerson}
                    getMotherSlug={getMotherSlug}
                    getFaterSlug={getFaterSlug}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
