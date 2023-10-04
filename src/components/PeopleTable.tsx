import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonItem } from './PersonItem';
import { TABLE_HEADERS } from '../utils/constants';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table
  is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADERS.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            person={person}
            key={person.slug}
            isSelected={person.slug === selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
