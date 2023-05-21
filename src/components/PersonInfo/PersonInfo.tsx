import { FC } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
}

export const PersonInfo: FC<Props> = ({ person }) => {
  const { slug: selectedSlug } = useParams();

  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': selectedSlug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother
        ? (
          <td><PersonLink person={mother} /></td>
        )
        : (
          <td>{motherName || '-'}</td>
        )}

      {father
        ? (
          <td><PersonLink person={father} /></td>
        )
        : (
          <td>{fatherName || '-'}</td>
        )}
    </tr>
  );
};
