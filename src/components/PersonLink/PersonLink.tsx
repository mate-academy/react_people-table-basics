import { useMemo } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonLink: React.FC<Props> = ({ person, selectedPerson }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
    mother,
    father,
  } = person;

  const isSelected = useMemo(() => (
    (personSlug: string) => personSlug === selectedPerson
  ), [selectedPerson]);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelected(slug),
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
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
              to={`../${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )
          : <span>{motherName || '-'}</span>}
      </td>
      <td>
        {father
          ? (
            <Link to={`../${father.slug}`}>
              {fatherName}
            </Link>
          )
          : <span>{fatherName || '-'}</span>}
      </td>
    </tr>
  );
};
