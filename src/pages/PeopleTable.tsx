// PeopleTable.jsx
import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
            <td aria-label="Link">
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td aria-label="Link">
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'}
            </td>
            <td aria-label="Link">
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
