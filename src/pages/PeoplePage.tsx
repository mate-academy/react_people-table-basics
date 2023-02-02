import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isPeopleLoadingError, setIsPeopleLoadingError] = useState(false);

  const getFullPeopleFromServer = async () => {
    try {
      setIsPeopleLoading(true);

      const peopleFromServer = await getPeople();

      const fullPeople = peopleFromServer.map(person => {
        const mother = peopleFromServer.find(
          personMother => personMother.name === person.motherName,
        );

        const father = peopleFromServer.find(
          personFather => personFather.name === person.fatherName,
        );

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(fullPeople);
    } catch {
      setIsPeopleLoadingError(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    getFullPeopleFromServer();
  }, []);

  const isNoPeople = people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {isPeopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(isNoPeople && !isPeopleLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isNoPeople && (
            <PeopleTable
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};
