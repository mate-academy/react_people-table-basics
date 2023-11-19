import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedSlug } = useParams();

  const getParent = (name: string | null): Person | undefined => {
    return name ? people.find(person => person.name === name) : undefined;
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
          const mother = getParent(person.motherName);
          const father = getParent(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn(
                { 'has-background-warning': person.slug === selectedSlug },
              )}
            >
              <td>
                <a href={`#/people/${person.slug}`}>
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : person.motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
