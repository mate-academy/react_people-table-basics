import React from 'react';
import { Person } from '../../types/Person';

type Props = {
  people: Person[],
};

export const PeopleInfo: React.FC<Props> = ({ people }) => (
  <>
    {[people.map(person => {
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
          <td>{motherName && motherName}</td>
          <td>{fatherName && fatherName}</td>
        </tr>
      );
    })]}
  </>
);
