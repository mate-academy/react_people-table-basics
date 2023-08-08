import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  personFind: (name: string) => Person | undefined,
};

export const PersonLink: React.FC<Props> = ({
  person,
  personFind,
}) => {
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <Link
          to={`${person.slug}`}
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

      <td>
        {person.motherName && (
          personFind(person.motherName) ? (
            <Link
              className="has-text-danger"
              to={`${personFind(person.motherName)?.slug || ''}`}
            >
              {person.motherName}
            </Link>
          ) : (
            person.motherName
          )
        )}
        {!person.motherName && '-'}
      </td>

      <td>
        {person.fatherName !== null
          && personFind(person.fatherName) !== undefined
          && (
            <Link
              to={`${personFind(person.fatherName)?.slug || ''}`}
            >
              {person.fatherName}
            </Link>
          )}

        {person.fatherName !== null
          && personFind(person.fatherName) === undefined
          && (`${person.fatherName}`)}

        {!person.fatherName && '-'}
      </td>
    </tr>
  );
};
