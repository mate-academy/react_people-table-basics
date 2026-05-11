import { FC } from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};
export const PersonLink: FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const mom = person.motherName ? person.motherName : '-';

  const dad = person.fatherName ? person.fatherName : '-';

  const mother = person.mother ? (
    <td>
      <Link
        className={classNames('', {
          'has-text-danger': person.mother.sex === 'f',
        })}
        to={`/people/${person.mother.slug}`}
      >
        {person.mother.name}
      </Link>
    </td>
  ) : (
    <td>{mom}</td>
  );

  const father = person.father ? (
    <td>
      <Link className="" to={`/people/${person.father.slug}`}>
        {person.father.name}
      </Link>
    </td>
  ) : (
    <td>{dad}</td>
  );

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames('', {
            'has-text-danger': person.sex === 'f',
          })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {mother}
      {father}
    </tr>
  );
};
