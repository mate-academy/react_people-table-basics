import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedPersonSlug }) => {
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
            key={person.slug}
            className={cn(
              { 'has-background-warning': person.slug === selectedPersonSlug },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.motherName
                ? <PersonLink person={person.mother} />
                : '-'}
            </td>

            <td>
              {person.fatherName
                ? <PersonLink person={person.father} />
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
