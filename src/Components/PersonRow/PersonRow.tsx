import React from 'react';

interface Props {
  people: PeopleParrents[];
}

export const PersonRow: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map(person => (
        <tr key={person.slug}>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.motherName || '-'}</td>
          <td>{person.fatherName || '-'}</td>
        </tr>
      ))}
    </>
  );
};
