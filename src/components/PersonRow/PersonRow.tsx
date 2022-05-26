import { FC } from 'react';
import { PersonWithParents } from '../../types/Person';

interface Props {
  person: PersonWithParents;
}

export const PersonRow: FC<Props> = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName || 'No mother'}</td>
      <td>{person.fatherName || 'No father'}</td>
    </tr>
  );
};
