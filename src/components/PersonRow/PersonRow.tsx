import React from 'react';
import './PersonRow.scss';

type PersonProps = {
  person: Person,
};

const PersonRow: React.FC<PersonProps> = ({ person }) => {
  return (
    <>
      <tr className="Person">
        <td>
          {person.name}
        </td>
        <td>
          {
            person.sex === 'm'
              ? 'male'
              : 'female'
          }
        </td>
        <td>
          {person.born}
        </td>
        <td>
          {person.died}
        </td>
        <td>
          {
            person.mother
              ? `${person.mother.name} | ${person.mother.born} - ${person.mother.died}`
              : 'Information is absent'
          }
        </td>
        <td>
          {person.father ? person.father.name : 'Information is absent'}
        </td>
      </tr>
    </>
  );
};

export default PersonRow;
