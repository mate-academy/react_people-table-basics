import { FC, memo } from 'react';
import './PersonRow.scss';

interface PersonRowProps {
  person: Person;
}

export const PersonRow: FC<PersonRowProps> = memo(
  ({ person }) => {
    return (
      <tr className="PersonRow">
        <td className="PersonRow__data">{person.name}</td>
        <td className="PersonRow__data">{person.sex}</td>
        <td className="PersonRow__data">{person.born}</td>
        <td className="PersonRow__data">{person.died}</td>
        <td className="PersonRow__data">{person.fatherName}</td>
        <td className="PersonRow__data">{person.motherName}</td>
      </tr>
    );
  },
);
