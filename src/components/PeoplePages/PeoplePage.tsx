import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadingPeople = async () => {
      setIsLoading(true);
      const dataPeople = await getPeople();

      if (!dataPeople) {
        setError(true);
      }

      const peopleWithParents = dataPeople.map(person => {
        const findParentByName = (parentName: string) => {
          return dataPeople
            .find(parentPerson => parentPerson.name === parentName);
        };

        let mother;
        let father;

        if (person.motherName) {
          mother = findParentByName(person.motherName);
        }

        if (person.fatherName) {
          father = findParentByName(person.fatherName);
        }

        return {
          ...person,
          mother,
          father,
        };
      });

      setIsLoading(false);
      setPeople(peopleWithParents);
    };

    loadingPeople();
  }, []);

  return (
    <>

      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? <Loader />
            : (
              <PeopleTable
                isLoading={isLoading}
                people={people}
                error={error}
              />
            )}
        </div>
      </div>
    </>
  );
};
