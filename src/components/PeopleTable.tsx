import { FC } from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

interface Props {
  people: Person[]
}

export const PeopleTable:FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => {
        return (
          <tr key={person.slug} data-cy="person">
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? (<PersonLink person={person.mother} />)
                : (person.motherName || '-')}
            </td>
            <td>
              {person.father
                ? (<PersonLink person={person.father} />)
                : (person.fatherName || '-')}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
