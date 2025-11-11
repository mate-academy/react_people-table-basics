import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setPeopleLoadingError(false);

    const loadPeople = async () => {
      try {
        const peopleFormServer = await getPeople();

        setPeople(peopleFormServer);
      } catch (error) {
        setPeopleLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && people === null ? (
            <Loader />
          ) : !peopleLoadingError ? (
            people !== null && (
              <>
                {people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                <PeopleTable people={people} />
              </>
            )
          ) : (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
