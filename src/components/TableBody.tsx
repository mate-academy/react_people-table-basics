import React from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[],
};

const PersonRow: React.FC<Props> = ({ people }) => (
  <>
    {people.map(person => {
      const {
        slug,
        name,
        sex,
        born,
        died,
        motherName,
        fatherName,
      } = person;

      return (
        <tr key={slug}>
          <td>{name}</td>
          <td>{sex}</td>
          <td>{born}</td>
          <td>{died}</td>
          <td>{motherName}</td>
          <td>{fatherName}</td>
        </tr>
      );
    })}
  </>
);

export default PersonRow;
