import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';

interface Props {
  peoples: Person[];
  selectedPersonSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({
  peoples,
  selectedPersonSlug,
}) => {
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
        {peoples.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            // className="has-background-warning"
            className={cn({
              'has-background-warning': selectedPersonSlug === person.slug,
            })}
          >
            <td>
              <PersonLink personName={person.name} allPeople={peoples} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink personName={person.motherName} allPeople={peoples} />
            </td>
            <td>
              <PersonLink personName={person.fatherName} allPeople={peoples} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
