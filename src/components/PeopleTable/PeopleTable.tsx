import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (!parent) {
      return parentName;
    }

    return <PersonLink person={parent} />;
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
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': slug === person.slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParent(person.motherName)}</td>
            <td>{getParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
