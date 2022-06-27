import React from 'react';

type Props = {
  people: PersonWithParents[]
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map(person => (
        <tr className="Person" key={person.slug}>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.father?.name || '-'}</td>
          <td>{person.mother?.name || '-'}</td>
        </tr>
      ))}
    </>
  );
};
