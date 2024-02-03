import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  fatherLink: string | null;
  motherLink: string | null;
};

export const PersonItem: React.FC<Props> = ({
  person,
  fatherLink,
  motherLink,
}) => {
  const { slug } = useParams();

  const motherName = person.motherName?.length ? person.motherName : '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`../people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherLink && person.motherName
          ? (
            <Link
              to={`../people/${motherLink}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          )
          : (
            <p>{motherName}</p>
          )}
      </td>
      <td>
        {fatherLink && person.fatherName
          ? (
            <Link
              to={`../people/${fatherLink}`}
            >
              {person.fatherName}
            </Link>
          )
          : (
            <p>{person.fatherName || '-'}</p>
          )}
      </td>
    </tr>
  );
};