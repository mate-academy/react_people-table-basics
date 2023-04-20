import classNames from 'classnames';
import { FC } from 'react';
import { PeopleLink } from './PeopleLink';
import { Person } from '../types';

interface Props {
  person: Person;
  selectedPersonSlug: string;
}

export const PeopleInfo: FC<Props> = ({
  person,
  selectedPersonSlug,
}) => {
  const {
    sex,
    born,
    slug,
    died,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': slug === selectedPersonSlug,
      })}
    >
      <td>
        <PeopleLink person={person} />
      </td>
      <td>
        {sex}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {mother ? (
          <PeopleLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PeopleLink person={father} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
