import { useState, useEffect } from 'react';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(response => {
        const peopleWithParents = response.map(person => {
          const father = response
            .find(human => human.name === person.fatherName);
          const mother = response
            .find(human => human.name === person.motherName);

          return { ...person, father, mother };
        });

        setPeople(peopleWithParents);
      });
  }, []);

  return (
    <>
      <h1 className="title has-text-centered">People page</h1>

      <PeopleTable people={people} />
    </>
  );
};
