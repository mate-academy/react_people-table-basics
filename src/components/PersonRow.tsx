import React from 'react';

type Props = {
  person: Person;
  index: number;
};

const PersonRow: React.FC<Props> = ({ person, index }) => {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother?.name}</td>
      <td>{person.father?.name}</td>
    </tr>
  );
};

export default PersonRow;
