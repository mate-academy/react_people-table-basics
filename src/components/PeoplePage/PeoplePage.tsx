import { useState, useEffect } from 'react';
import { getPeopleFromServer } from '../../api/getPeopleAPI';
import { PeopleTable } from '../PeopleTable';

const addParents = (humans: Person[]): PersonWithParents[] => {
  const newHumans = humans.map(human => {
    const mother = humans.find(person => {
      return person.name === human.motherName;
    }) || null;

    const father = humans.find(person => {
      return person.name === human.fatherName;
    }) || null;

    return ({
      ...human,
      mother,
      father,
    });
  });

  return newHumans;
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeopleFromServer()
      .then(response => {
        setPeople(response);
      });
  }, []);

  const newPeople = addParents(people);

  return (
    <PeopleTable people={newPeople} />
  );
};
