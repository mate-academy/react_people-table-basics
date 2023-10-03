import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonItem } from './PersonItem';

const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findPersonByName = (name: string | null) => {
    return people.find(person => person.name === name) || null;
  };

  const { slug: selectedSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table
  is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <tr>
            {tableHeaders.map(header => (
              <th>{header}</th>
            ))}
          </tr>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            person={person}
            key={person.slug}
            mother={findPersonByName(person.motherName)}
            father={findPersonByName(person.fatherName)}
            isSelected={person.slug === selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
