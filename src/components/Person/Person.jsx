import React from 'react';
import { personType } from '../../types/peopleTypes';

function Person({ person }) {
  const rowTemplate = [
    'name',
    'sex',
    'born',
    'died',
    'fatherName',
    'motherName',
  ];

  return (
    <tr className="table__body-row">
      {rowTemplate.map(key => (
        <td key={key} className="table__cell">
          {person[key]}
        </td>
      ))}
    </tr>
  );
}

Person.propTypes = {
  person: personType.isRequired,
};

export const PersonRow = React.memo(Person);
