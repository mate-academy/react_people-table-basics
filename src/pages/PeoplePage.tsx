import { FC, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);

  const fetchData = async () => {
    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map((person) => {
        const mother = peopleFromServer.find(
          (personMother) => personMother.name === person.motherName,
        );

        const father = peopleFromServer.find(
          (personFather) => personFather.name === person.fatherName,
        );

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(peopleWithParents);
    } catch (errorMessage) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const successLoad = !isLoading && !error;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!people.length && successLoad && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && successLoad && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
