import React from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  function findParent(parentName: string | null) {
    if (!parentName) {
      return <td>-</td>;
    }

    const parent = people.find(p => p.name === parentName);

    if (parent) {
      return (
        <td>
          <PersonLink person={parent} />
        </td>
      );
    }

    return <td>{parentName}</td>;
  }

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
            {person.slug ? (
              <td>
                <PersonLink person={person} />
              </td>
            ) : (
              <td>{person.name}</td>
            )}

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {findParent(person.motherName)}
            {findParent(person.fatherName)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
