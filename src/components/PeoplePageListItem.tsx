import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useValues } from '../PeopleContext';

type Props = {
  person: Person;
};

export const PeoplePageListItem: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { people } = useValues();
  const { slug: slugName } = useParams();

  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slugName === slug })}
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
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {motherName || '-'}
          </Link>
        ) : (
          <p>{motherName || '-'}</p>
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{fatherName || '-'}</Link>
        ) : (
          <p>{fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
