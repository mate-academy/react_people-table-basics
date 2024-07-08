import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const loadedPeople = await getPeople();

      setPeople(
        loadedPeople.map((person, _index, peopleToMap) => ({
          ...person,
          mother: peopleToMap.find(mother => mother.name === person.motherName),
          father: peopleToMap.find(father => father.name === person.fatherName),
        })),
      );
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  let content: React.JSX.Element;

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  } else if (!people.length) {
    content = (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  } else {
    content = <PeopleTable people={people} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">{content}</div>
    </>
  );
};
