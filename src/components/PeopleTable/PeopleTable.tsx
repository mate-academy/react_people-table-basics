import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personName } = useParams();

  const changingEndOfLink = (currentPerson: Person) => {
    return `${currentPerson.name.toLowerCase().replaceAll(' ', '-')}-${currentPerson.born}`;
  };

  const selectedPersonName
  = people.find(
    person => changingEndOfLink(person) === personName,
  )?.name || null;

  const personInTheList = (currentName: string | null): Person | null => {
    return people.find(person => person.name === currentName) || null;
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
          <PersonLink
            key={person.name}
            person={person}
            personInTheList={personInTheList}
            selectedPersonName={selectedPersonName}
            changingEndOfLink={changingEndOfLink}
          />
        ))}
      </tbody>
    </table>
  );
};
