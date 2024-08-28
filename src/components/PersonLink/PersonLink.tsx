/* eslint-disable no-console */
import cn from 'classnames';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

enum Sex {
  female = 'f',
  male = 'm',
}

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personParam } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personParam === person.slug,
      })}
    >
      <td>
        <Link
          to={person.slug}
          className={cn({ 'has-text-danger': person.sex === Sex.female })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link
            to={person.mother?.slug}
            className={cn({ 'has-text-danger': person.motherName })}
          >
            {person.motherName}
          </Link>
        ) : (
          <span>{person.motherName || '-'}</span>
        )}
      </td>
      <td>
        {person.father ? (
          <Link to={person.father?.slug}>{person.fatherName}</Link>
        ) : (
          <span>{person.fatherName || '-'}</span>
        )}
      </td>
    </tr>
  );
};
