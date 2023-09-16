import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { getPeopleWithParents } from '../../helpers/helpers';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents = getPeopleWithParents(peopleFromServer);

      setPeople(peopleWithParents);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const noPeopleOnServer = !people.length && !isLoading && !isError;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && (
          <Loader />
        )}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {noPeopleOnServer && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {people.length > 0 && (
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
                <PersonInfo
                  key={person.slug}
                  person={person}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
