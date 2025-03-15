import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(
    slug || null,
  );

  useEffect(() => {
    setSelectedPerson(slug || null);
  }, [slug]);

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
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
            selectedPerson={selectedPerson}
            onPersonSelect={setSelectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
