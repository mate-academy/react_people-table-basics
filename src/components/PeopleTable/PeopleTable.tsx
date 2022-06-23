import React, { useEffect, useState } from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import { getPeople } from '../../people';
import './PeopleTable.scss';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<PersonWithParents[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = peopleFromServer.map(person => {
          const mother = peopleFromServer
            .find(human => human.name === person.motherName) || null;
          const father = peopleFromServer
            .find(human => human.name === person.fatherName) || null;

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);
      });
  }, []);

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
