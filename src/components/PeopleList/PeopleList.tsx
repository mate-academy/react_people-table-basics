import React from 'react';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  peopleList: Person[];
};

export const PeopleList: React.FC<Props> = ({ peopleList }) => {
  const modifiedPeopleList = peopleList.map(person => {
    const father = peopleList.find(p => p.name === person.fatherName);
    const mother = peopleList.find(p => p.name === person.motherName);

    return {
      ...person,
      father: father,
      mother: mother,
    };
  });

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
        {modifiedPeopleList.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
