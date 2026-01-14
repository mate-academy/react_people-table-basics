import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  isSelected?: boolean;
};

export const PersonLink = ({ person, isSelected }: Props) => {
  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.motherName ? (
          person.mother ? (
            <Link
              className="has-text-danger"
              to={`/people/${person.mother.slug}`}
            >
              {`${person.mother.name}`}
            </Link>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>

      <td>
        {person.fatherName ? (
          person.father ? (
            <Link to={`/people/${person.father.slug}`}>
              {`${person.father.name}`}
            </Link>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
