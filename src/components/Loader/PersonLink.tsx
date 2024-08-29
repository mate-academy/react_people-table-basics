import classNames from 'classnames';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.name}
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName ? person.motherName : '-'}</td>
      <td>{person.fatherName ? person.fatherName : '-'}</td>
    </tr>
  );
};
