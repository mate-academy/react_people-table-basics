import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
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
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <PersonLink
                person={person.mother}
                foundPerson={person.motherName}
              />
            </td>

            <td>
              <PersonLink
                person={person.father}
                foundPerson={person.fatherName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
