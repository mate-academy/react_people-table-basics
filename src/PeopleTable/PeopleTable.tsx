import React from 'react';
import { Person } from '../types';
import { PersonRow } from '../PersonRow';

export const PeopleTable = (props: {people: Person[]}) => {
  const personRows = () => {
    return props.people.map(person => (<PersonRow key={person.slug} person={person} />));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Sex</td>
          <td>Born</td>
          <td>Died</td>
          <td>Mother</td>
          <td>Father</td>
        </tr>
      </thead>
      <tbody>
        {personRows()}
      </tbody>
    </table>
  );
};
