import classNames from 'classnames';
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
  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={`${person.sex === 'f' && 'has-text-danger'}`}
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
          : `${person.motherName
            ? `${person.motherName}`
            : '-'}`}
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
          : `${person.fatherName
            ? `${person.fatherName}`
            : '-'}`}
      </td>
    </tr>
  );
};
