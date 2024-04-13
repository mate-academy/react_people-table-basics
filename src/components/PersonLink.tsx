import classNames from 'classnames';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Person } from '../types';

export type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: FC<Props> = ({ person, people }) => {
  const {
    slug: personSlug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <Link
          to={`/people/${personSlug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
