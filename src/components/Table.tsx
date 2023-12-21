import {
  useEffect,
  useState,
} from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader';

export const Table = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPeople();

        setPeople(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {
        isLoading
          ? <Loader />
          : (
            <>
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!people.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="
                  table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth"
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
                        people={people}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )
      }
    </>
  );
};
