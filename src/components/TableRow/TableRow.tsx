import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person,
}

export const TableRow: React.FC<Props> = memo(({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? <PersonLink person={person.mother} />
          : person.motherName || '-'}
      </td>
      <td>
        {person.father
          ? <PersonLink person={person.father} />
          : person.fatherName || '-'}
      </td>
    </tr>
  );
});
