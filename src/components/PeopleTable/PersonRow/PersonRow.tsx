import React from 'react';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person">
      <td>
        {person.name}
      </td>
      <td>
        {person.sex}
      </td>
      <td>
        {person.born}
      </td>
      <td>
        {person.died}
      </td>
      <td>
        {person.motherName || (
          <p>
            -/-
          </p>
        )}
      </td>
      <td>
        {person.fatherName || (
          <p>
            -/-
          </p>
        )}
      </td>
    </tr>
  );
};
