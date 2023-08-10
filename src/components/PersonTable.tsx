import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import PersonTableRow from './PersonTableRow';

type PersonTableProps = {
  people: Person[],
};

const PersonTable:React.FC<PersonTableProps> = ({ people }) => {
  const { personSlug } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const getPersonBySlug = (slug: string) => {
    return people.find(person => person.slug === slug);
  };

  useEffect(() => {
    if (personSlug) {
      const person = getPersonBySlug(personSlug);

      if (person) {
        setSelectedPerson(person);
      }
    }
  }, [personSlug]);

  if (people.length === 0) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
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
        {
          people.map(person => (
            <PersonTableRow
              person={person}
              key={person.slug}
              isSelected={selectedPerson?.slug === person.slug}
              motherSlug={person.mother?.slug}
              fatherSlug={person.father?.slug}
            />
          ))
        }
      </tbody>
    </table>
  );
};

export default PersonTable;
