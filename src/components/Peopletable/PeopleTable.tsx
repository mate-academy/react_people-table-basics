import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect((() => {
    getPeople().then(res => {
      if (res) {
        const prepearedPeople = res.map(person => {
          const father = res
            .find(parent => person.fatherName === parent.name) || null;

          const mother = res
            .find(parent => person.motherName === parent.name) || null;

          return ({
            ...person,
            fatherName: person.fatherName || '--John Doe--',
            motherName: person.motherName || '--Jane Doe--',
            father,
            mother,
          }
          );
        });

        setPeople(prepearedPeople);
      }
    });
  }), []);

  return (
    <div className="level-item">
      <table className="table is-striped">
        <thead>
          <tr>
            <th title="Name"> Name</th>
            <th title="sex">Sex</th>
            <th title="born">Born</th>
            <th title="died">Died</th>
            <th title="mother">Mother</th>
            <th title="father">Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => {
            return (
              <PersonRow
                person={person}
                key={person.slug}
              />
            );
          })}

        </tbody>
      </table>
    </div>
  );
};
