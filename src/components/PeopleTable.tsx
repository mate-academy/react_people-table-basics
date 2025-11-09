import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedPersonSlug: string;
  renderParent: (name: string | null) => React.ReactNode;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  renderParent,
}) => (
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
          className={classNames({
            'has-background-warning': selectedPersonSlug === person.slug,
          })}
        >
          <td>
            <PersonLink person={person} />
          </td>

          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{renderParent(person.motherName)}</td>
          <td>{renderParent(person.fatherName)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
