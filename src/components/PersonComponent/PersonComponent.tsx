import React, { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
}

export const PersonComponent: FC<Props> = React.memo(({ person }) => {
  const params = useParams();

  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
    mother = null,
    father = null,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': params.slug === `:${slug}`,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || '-'}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
});
