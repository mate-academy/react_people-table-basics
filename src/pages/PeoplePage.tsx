import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

const getPreparedPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(({ name }) => name === person.motherName),
      father: people.find(({ name }) => name === person.fatherName),
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(getPreparedPeople(peopleFromServer));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && !isLoading && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {!people?.length && !isLoading && !isError && (
            <p
              data-cy="noPeopleMessage"
            >
              There are no people on the server
            </p>
          )}

          {!!people?.length && !isError && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>

  );
};
