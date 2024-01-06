import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);

        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch (errorMessage) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const addParentsToPeople = (ppl: Person[]) => {
    const updatedPeople = ppl.map(person => {
      const mother = ppl.find(prs => prs.name === person.motherName);
      const father = ppl.find(prs => prs.name === person.fatherName);

      const updatedPerson = { ...person };

      if (mother) {
        updatedPerson.mother = mother;
      }

      if (father) {
        updatedPerson.father = father;
      }

      return updatedPerson;
    });

    return updatedPeople;
  };

  const updatedPeople = addParentsToPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {error
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {updatedPeople.length === 0 && !isLoading
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {isLoading
            ? <Loader />
            : <PeopleTable people={updatedPeople} />}
        </div>
      </div>
    </>
  );
};
