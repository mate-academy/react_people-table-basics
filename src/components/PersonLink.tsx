import React from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

type Pers = Person | undefined;

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { died, born, name, sex, fatherName, motherName } = person;
  const { slug } = useParams();

  const father: Pers = people.find(pers => pers.name === fatherName);
  const mother: Pers = people.find(pers => pers.name === motherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={`../${person.slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <Link className="has-text-danger" to={`../${mother.slug}`}>
            {motherName}
          </Link>
        ) : (
          `${motherName || '-'}`
        )}
      </td>

      <td>
        {father ? (
          <Link to={`../${father.slug}`}>{fatherName}</Link>
        ) : (
          `${fatherName || '-'}`
        )}
      </td>
    </tr>
  );
};
