import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

const updatePeople = (loadPeople: Person[]) => {
  const updatedPeople = loadPeople.map(person => {
    return {
      ...person,
      mother:
        loadPeople.find(mother => mother.name === person.motherName),
      father:
        loadPeople.find(father => father.name === person.fatherName),
    };
  });

  return updatedPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        const loadPeople = await getPeople();

        setPeople(updatePeople(loadPeople));
        setIsLoading(false);
      } catch {
        setHasError(true);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {hasError
            ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )
            : (
              <PeopleTable
                people={people}
                selectedPerson={slug}
                isLoading={isLoading}
              />
            )}
        </div>
      </div>
    </>
  );
};
