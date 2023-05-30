import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonRow } from '../../components/PersonRow';

export const PeopleTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);

  const loadPeople = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const loadedPeople = await getPeople();

      setPeople(loadedPeople);

      setError(false);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length ? (
            !error
            && !isLoading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )
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
                {people.map((person) => {
                  const isMother
                    = people.find(
                      (human) => human.name === person.motherName,
                    ) || null;
                  const isFather
                    = people.find(
                      (human) => human.name === person.fatherName,
                    ) || null;

                  return (
                    <PersonRow
                      key={person.slug}
                      motherInList={isMother}
                      fatherInList={isFather}
                      person={person}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
