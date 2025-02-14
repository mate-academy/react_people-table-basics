import React from 'react';
import { Person } from '../../../types';
import { PersonItem } from '../PersonItem';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const activeSlug = slug;

  const getParent = (parentName: string | null): Person | undefined =>
    people.find(person => person.name === parentName);

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
          <PersonItem
            key={person.slug}
            person={person}
            activeSlug={activeSlug}
            getParent={getParent}
          />
        ))}
      </tbody>
    </table>
  );
};
