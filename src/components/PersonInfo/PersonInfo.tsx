import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';

import { findPersonByName } from '../../utils/findPersonByName';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonInfo: FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();

  const mother = findPersonByName(people, person.motherName);
  const father = findPersonByName(people, person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === personSlug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className={'has-text-danger'}>
            {person.motherName}
          </Link>
        ) : (
          <>{person.motherName || '-'}</>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
        ) : (
          <>{person.fatherName || '-'}</>
        )}
      </td>
    </tr>
  );
};
