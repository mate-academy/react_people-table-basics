import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person,
}

export const PersonInfo: FC<Props> = ({ person }) => {
  const {
    slug,
    sex,
    born,
    died,
    mother,
    father,
    fatherName,
    motherName,
  } = person;

  const { userSlug } = useParams();
  const isSelected = slug === userSlug;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
