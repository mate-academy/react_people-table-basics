import React from 'react';

type Props = {
  person: Child,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr key={person.slug} className="Person">
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
        {person.mother?.name ? person.mother?.name : 'No Data'}
      </td>
      <td>
        {person.father?.name ? person.father?.name : 'No Data'}
      </td>
    </tr>
  );
};
