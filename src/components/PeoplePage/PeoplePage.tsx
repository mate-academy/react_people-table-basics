import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const gettingPeople = async () => {
      try {
        setIsLoading(true);

        const peopleFromServer = await getPeople();

        const peopleToRender = peopleFromServer.map(person => {
          return {
            ...person,
            mother: peopleFromServer
              .find(({ name }) => name === person.motherName),
            father: peopleFromServer
              .find(({ name }) => name === person.fatherName),
          };
        });

        setPeople(peopleToRender);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    gettingPeople();
  }, []);

  return (
    <>
      {(!!people?.length && !error) && <PeopleTable people={people} />}
      {(people?.length === 0 && !error) && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      {(isLoading && <Loader />)}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </>
  );
};
