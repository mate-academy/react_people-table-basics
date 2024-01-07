import { useEffect, useState } from 'react';
import { PeopleTable } from '../../components/Loader/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPpl = async () => {
      try {
        setIsLoading(true);

        const response = await getPeople();

        const peopleToRender = response.map(person => {
          return {
            ...person,
            mother: response.find(p => p.name === person.motherName),
            father: response.find(p => p.name === person.fatherName),
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

    getPpl();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
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
        </div>
      </div>
    </>
  );
};
