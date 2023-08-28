import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader/Loader';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPeople = async () => {
    setLoading(true);
    setError(false);

    try {
      const peopleFromServer = await getPeople();
      const childrenWithParents = peopleFromServer.map(person => ({
        ...person,
        father: peopleFromServer.find(
          father => father.name === person.fatherName,
        ),
        mother: peopleFromServer.find(
          mother => mother.name === person.motherName,
        ),
      }));

      setPeople(childrenWithParents);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const noPeopleOnTheServer = people.length === 0 && !error && !loading;

  return (
    <>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleOnTheServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length !== 0 && (
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
                    key={person.slug}
                    person={person}
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
