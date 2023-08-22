import { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      setIsLoading(true);
      setPeople(
        peopleFromServer.map((person) => {
          return {
            ...person,
            mother: peopleFromServer.find(
              (mother) => person.motherName === mother.name,
            ),

            father: peopleFromServer.find(
              (father) => person.fatherName === father.name,
            ),
          };
        }),
      );
    } catch (error) {
      setIsError(true);
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
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading ? <Loader /> : <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
