import React from 'react';

interface Props {
  person: Person;
}

export const PersonRow: React.FC<Props> = (props) => {
  const { person } = props;

  return (
    <tr className="Person">
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.fatherName}</td>
      <td>{person.motherName}</td>
    </tr>
  );
}
