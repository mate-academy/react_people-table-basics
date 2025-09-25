import { PersonLink } from '../PersonLink';
import type { Person } from '../../types/Person';
import { generateSlug } from '../../utils/generateSlug';
import React from 'react';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

const PeopleTable = ({ people, selectedSlug }: Props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Mother</th>
        <th>Father</th>
        <th>Born</th>
        <th>Died</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => {
        const slug = generateSlug(person);

        return (
          <tr
            key={slug}
            className={slug === selectedSlug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
            <td>{person.born}</td>
            <td>{person.died}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default PeopleTable;
