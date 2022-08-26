import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { slug = '' } = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadPeople = await getPeople();

        const updatedPeople = loadPeople.map(person => {
          return {
            ...person,
            mother:
              loadPeople.find(mother => mother.name === person.motherName),
            father:
              loadPeople.find(father => father.name === person.fatherName),
          };
        });

        setPeople(updatedPeople);
        setIsLoading(false);
      } catch {
        setError(true);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error
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
