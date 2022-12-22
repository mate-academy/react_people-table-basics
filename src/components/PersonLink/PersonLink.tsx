import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  slug?: string;
  mother?: Person;
  father?: Person;
};

export const PersonLink: React.FC<Props> = ({
  person,
  slug,
  mother,
  father,
}) => {
  const hasMother = `${person.motherName
    ? `${person.motherName}`
    : '-'}`;

  const hasFather = `${person.fatherName
    ? `${person.fatherName}`
    : '-'}`;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
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
        {mother
          ? (
            <Link
              className="has-text-danger"
              to={`/people/${mother.slug}`}
            >
              {mother.name}
            </Link>
          )
          : hasMother}
      </td>

      <td>
        {father
          ? (
            <Link
              to={`/people/${father.slug}`}
            >
              {father.name}
            </Link>
          )
          : hasFather}
      </td>
    </tr>
  );
};
