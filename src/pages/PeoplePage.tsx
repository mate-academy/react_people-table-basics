import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getCurrentPerson } from '../utils';
import { PersonRow } from '../components/PersonRow';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { person } = useParams();

  const currentPerson = person ? getCurrentPerson(person) : null;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !isLoading && !error && (
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
                {people.map(p => {
                  const mother = people.find(
                    human => human.name === p.motherName,
                  );

                  const father = people.find(
                    human => human.name === p.fatherName,
                  );

                  const isActive = currentPerson
                    ? p.name.toLowerCase() === currentPerson.name &&
                      p.born === currentPerson.born
                    : false;

                  return (
                    <PersonRow
                      key={p.name + p.born}
                      person={p}
                      mother={mother}
                      father={father}
                      isActive={isActive}
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
