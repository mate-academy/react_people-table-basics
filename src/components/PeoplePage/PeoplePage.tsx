import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setError] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const getPeopleFromSever = async () => {
      try {
        const peopleFromServer = await getPeople();

        const linkedPeople = peopleFromServer.map(person => {
          const newPerson = { ...person };

          const findParentByName = (
            parent: Person[],
            parentName: string | null,
          ) => parent.find(human => human.name === parentName);

          const mother = findParentByName(peopleFromServer, person.motherName);
          const father = findParentByName(peopleFromServer, person.fatherName);

          if (mother) {
            newPerson.mother = mother;
          }

          if (father) {
            newPerson.father = father;
          }

          return newPerson;
        });

        setPeople(linkedPeople);
      } catch {
        setError(true);
      } finally {
        setLoaded(true);
      }
    };

    getPeopleFromSever();
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

          {isLoaded && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoaded && !isError
            ? <Loader />
            : <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
