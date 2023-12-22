import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleItem } from './PeopleItem';

export const People: React.FC = () => {
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);

  const [isRequestFailed, setIsRequestFailed] = useState(false);
  const isLoading = !isRequestFailed && !peopleFromServer;

  useEffect(
    () => {
      getPeople()
        .then(people => {
          setPeopleFromServer(people.map(person => ({
            ...person,
            mother: people.find(
              possibleMother => (possibleMother.name === person.motherName),
            ),
            father: people.find(
              possibleFather => (possibleFather.name === person.fatherName),
            ),
          })));
        })
        .catch(() => {
          setIsRequestFailed(true);
        });
    },
    [],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isRequestFailed && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleFromServer && (
            <>
              {peopleFromServer.length ? (
                <table
                  data-cy="peopleTable"
                  className={cn(
                    'table',
                    'is-striped',
                    'is-hoverable',
                    'is-narrow',
                    'is-fullwidth',
                  )}
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
                    {peopleFromServer.map(person => (
                      <PeopleItem person={person} />
                    ))}
                  </tbody>
                </table>

              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
