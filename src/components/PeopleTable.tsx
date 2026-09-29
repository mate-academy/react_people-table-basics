import React from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable = React.memo(function PeopleTable({ people }: Props) {
  const { slug } = useParams();

  const getParent = (child: Person, parent: 'father' | 'mother') => {
    if (!child[`${parent}Name`]) {
      return '-';
    }

    if (!child[parent]) {
      return child[`${parent}Name`];
    }

    return <PersonLink person={child[parent]} />;
  };

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
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParent(person, 'mother')}</td>
            <td>{getParent(person, 'father')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
