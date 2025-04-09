import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { PeopleLink } from '../PeopleLink/PeopleLink';

type Props = {
  people: Person[];
  slug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }: Props) => {
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
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PeopleLink name={person.name} people={people} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PeopleLink name={person.motherName || '-'} people={people} />
            </td>
            <td>
              <PeopleLink name={person.fatherName || '-'} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
