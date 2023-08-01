import React, { useState } from 'react';
import { Person } from '../../types';
import { Row } from '../Row/Row';

type Props = {
  persons: Person[]
};

export const Table: React.FC<Props> = ({
  persons,
}) => {
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string>();

  const personNamesFromSlug = persons.map(currPerson => currPerson.slug
    .toLowerCase().split('-').join('').slice(0, -4));

  const getPersonsMotherSlug = (fullName: string | null) => {
    if (!fullName) {
      return undefined;
    }

    const formatedFullName = fullName.toLocaleLowerCase().replace(/\s/g, '');
    const isMotherInList = personNamesFromSlug.includes(formatedFullName);

    if (!isMotherInList) {
      return undefined;
    }

    return persons.find(({ name }) => name === fullName)?.slug;
  };

  const getPersonsFatherSlug = (fullName: string | null) => {
    if (!fullName) {
      return undefined;
    }

    const formatedFullName = fullName.toLocaleLowerCase().replace(/\s/g, '');
    const isFatherInList = personNamesFromSlug.includes(formatedFullName);

    if (!isFatherInList) {
      return undefined;
    }

    return persons.find(({ name }) => name === fullName)?.slug;
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

        {persons.map(person => (
          <Row
            key={person.slug}
            person={person}
            isSelected={person.slug === selectedPersonSlug}
            motherSlug={getPersonsMotherSlug(person.motherName)}
            fatherSlug={getPersonsFatherSlug(person.fatherName)}
            onSelectPerson={setSelectedPersonSlug}
          />
        ))}

      </tbody>
    </table>
  );
};
