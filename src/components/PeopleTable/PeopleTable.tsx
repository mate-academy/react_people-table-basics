import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: activeSlug } = useParams();

  const getParent = (paranetName: string | null) => {
    const parent = people.find(person => person.name === paranetName);

    return parent
      ? <PersonLink person={parent} />
      : paranetName || '-';
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
            className={cn({
              'has-background-warning': person.slug === activeSlug,
            })}
            key={person.slug}
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
