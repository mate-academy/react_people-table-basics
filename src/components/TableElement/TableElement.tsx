import React from 'react';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

type Props = {
  name: string,
  sex: string,
  born: number,
  died: number,
  mother: Person | null,
  motherName: string | null,
  father: Person | null,
  fatherName: string | null,
  slug: string,
  personId: string | number,
};

export const TableElement: React.FC<Props> = (
  {
    name,
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
    slug,
    personId,
  },
) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personId,
      })}
    >
      <td>
        <a href="#/people/jan-van-brussel-1714">
          <PersonLink
            name={name}
            sex={sex}
            slug={slug}
          />
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink
              name={mother.name}
              sex={mother.sex}
              slug={mother.slug}
            />
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <PersonLink
              name={father.name}
              sex={father.sex}
              slug={father.slug}
            />
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
