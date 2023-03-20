import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ParentLink } from '../ParentLink/ParentLink';
import { PersonWithParents } from '../../types';

type Props = {
  person: PersonWithParents,
};

export const PersonCell: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;
  const { userSlug } = useParams();
  const isPersonSelected = slug === userSlug;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isPersonSelected },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        <ParentLink
          parent={mother}
          parentName={motherName}
        />
      </td>

      <td>
        <ParentLink
          parent={father}
          parentName={fatherName}
        />
      </td>
    </tr>
  );
};
