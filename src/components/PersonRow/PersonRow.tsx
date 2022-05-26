import { FC, memo } from 'react';
import { FullPerson } from '../../types/person';

interface Props {
  person: FullPerson
}

export const PersonRow: FC<Props> = memo(({ person }) => {
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
        {person.mother?.name}
      </td>
      <td>
        {person.father?.name}
      </td>
    </tr>
  );
});
