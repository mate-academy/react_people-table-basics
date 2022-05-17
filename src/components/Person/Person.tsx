import React from 'react';
import './Person.scss';

type Props = {
  person: Person,
};

export const Person: React.FC<Props> = (props) => {
  const { person } = props;

  return (
    <tr className="people__person person">
      <td className="person__cell">{person.name}</td>
      <td className="person__cell">{person.sex}</td>
      <td className="person__cell">{person.born}</td>
      <td className="person__cell">{person.died}</td>
      <td className="person__cell">
        {person.motherName
          ? person.motherName : <b>Unknown</b>}
      </td>
      <td className="person__cell">
        {person.fatherName
          ? person.fatherName : <b>Unknown</b>}
      </td>
    </tr>
  );
};
