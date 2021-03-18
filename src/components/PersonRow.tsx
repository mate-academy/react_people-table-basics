import React from 'react';
import { Person } from './PeopleTabel';

type personDetails = {
  person: Person
}

export const PersonRow: React.FC<personDetails> = ({ person }) => (
  <tr className="peopleTable__Person">
    <td className="peopleTable__Person__cell">{person.name}</td>
    <td className="peopleTable__Person__cell">{person.sex}</td>
    <td className="peopleTable__Person__cell">{person.born}</td>
    <td className="peopleTable__Person__cell">{person.died}</td>
    <td className="peopleTable__Person__cell">{person.motherName}</td>
    <td className="peopleTable__Person__cell">{person.fatherName}</td>
  </tr>
  );
