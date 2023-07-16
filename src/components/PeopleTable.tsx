import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonInfo } from './PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  const getParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (!parent) {
      return undefined;
    }

    return parent;
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
          <PersonInfo
            person={person}
            key={person.slug}
            personSlug={slug}
            getParent={getParent}
          />
        ))}
      </tbody>
    </table>
  );
};
