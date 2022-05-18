import React from 'react';
import './PersonRow.scss';

type PersonProps = {
  person: Person,
};

const PersonRow: React.FC<PersonProps> = ({ person }) => {
  const getPersonParentInfo
    = (parentName: string, parentType: 'mother' | 'father') => {
      if (!parentName) {
        return 'Information is absent';
      }

      switch (parentType) {
        case 'mother':
          if (!person.mother) {
            return `${parentName} (Detailed info is absent)`;
          }

          return `${parentName} | ${person.mother.born} - ${person.mother.died}`;

        default:
          if (!person.father) {
            return `${parentName} (Detailed info is absent)`;
          }

          return `${parentName} | ${person.father.born} - ${person.father.died}`;
      }
    };

  return (
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
        {getPersonParentInfo(person.motherName, 'mother')}
      </td>
      <td>
        {getPersonParentInfo(person.fatherName, 'father')}
      </td>
    </tr>
  );
};

export default PersonRow;
