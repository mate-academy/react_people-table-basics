import React from 'react';
import './PersonRow.scss';

type Props = {
  person: Person;
};

export const PersonRow:React.FC<Props> = ({ person }) => (
  <>
    <td className="cell">{person.name}</td>
    <td className="cell cell-center">{person.sex}</td>
    <td className="cell cell-center">{person.born}</td>
    <td className="cell cell-center">{person.died}</td>
    <td className="cell">{person.motherName || 'no data'}</td>
    <td className="cell">{person.fatherName || 'no data'}</td>
  </>
);
