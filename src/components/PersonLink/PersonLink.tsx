import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
  personSlug?: string | null;
}

export const PersonLink: FC<Props> = ({ person, personSlug }) => {
  const {
    name,
    sex,
    born,
    died,
    mother,
    father,
    slug,
    motherName,
    fatherName,
  } = person;

  const isSelected = personSlug === slug;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <Link
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )
          : (motherName || '-')}
      </td>
      <td>
        {father
          ? (
            <Link
              to={`/people/${father.slug}`}
            >
              {fatherName}
            </Link>
          )
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
