import React from 'react';
import cn from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person,
  people: Person[],
}

export const PersonItem: React.FC<Props> = ({
  person,
  people,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const { personSlug } = useParams();

  const mother = people.find(personItem => {
    return personItem.name === motherName;
  });

  const father = people.find(personItem => {
    return personItem.name === fatherName;
  });

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
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
      {mother ? (
        <td>
          <Link
            to={`/people/${mother.slug}`}
            className={cn({
              'has-text-danger': mother.sex === 'f',
            })}
          >
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}
      {father ? (
        <td>
          <Link
            to={`/people/${father.slug}`}
          >
            {father.name}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
