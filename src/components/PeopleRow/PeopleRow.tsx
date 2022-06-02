import React from 'react';
import { People } from '../../types/people';

type Props = {
  person: People,
};

const PeopleRow:React.FC<Props> = ({ person }) => {
  return (
    <>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName ? person.motherName : null}</td>
      <td>{person.fatherName ? person.fatherName : null}</td>
    </>
  );
};

export default PeopleRow;
