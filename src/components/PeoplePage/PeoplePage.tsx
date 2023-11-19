import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { EmptyPeopleList } from '../EmptyPeopleList/EmptyPeopleList';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { PeopleList } from '../PeopleList/PeopleList';

const peopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(pers => pers.name === person.motherName);
    const father = people.find(pers => pers.name === person.fatherName);

    return { ...person, mother, father };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then((peopleList) => setPeople(peopleWithParents(peopleList)))
      .catch(() => setError(true))
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader && <Loader />}
          {error && (
            <ErrorMessage />
          )}
          {(!isLoader && people.length === 0) && (
            <EmptyPeopleList />
          )}
          {(people.length !== 0 && !isLoader && !error) && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
