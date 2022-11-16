import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug: string;
}

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  return (
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
        {people.map(person => (
          <tr
            data-cy="person"
            className={
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother && (
              <td>
                <PersonLink person={person.mother} />
              </td>
            )}

            {(!person.mother && person.motherName) && (
              <td>
                {person.motherName}
              </td>
            )}

            {!person.motherName && <td>-</td>}

            {person.father && (
              <td>
                <PersonLink person={person.father} />
              </td>
            )}

            {(!person.father && person.fatherName) && (
              <td>
                {person.fatherName}
              </td>
            )}

            {!person.fatherName && <td>-</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
