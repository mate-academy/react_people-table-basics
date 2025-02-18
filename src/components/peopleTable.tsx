import React from 'react';
import { PersonLink } from './personLink';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();

  const findParentInTable = (parentName: string | null) => {
    return people.find(person => person.name === parentName);
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
        {people.map(person => {
          const mother = findParentInTable(person.motherName);
          const father = findParentInTable(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': slug === person.slug })}
            >
              <PersonLink person={person} />

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {mother ? (
                <PersonLink person={mother} />
              ) : (
                <td>{person.motherName || '-'}</td>
              )}

              {father ? (
                <PersonLink person={father} />
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
