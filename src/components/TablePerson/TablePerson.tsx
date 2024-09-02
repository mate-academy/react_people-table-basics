import classNames from 'classnames';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};
export const TablePerson: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { name, sex, born, died, motherName, fatherName, mother, father } =
    person;

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames('', {
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother ? (
        <td>
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || `-`}</td>
      )}
      {father ? (
        <td>
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        </td>
      ) : (
        <td>{fatherName || `-`}</td>
      )}
    </tr>
  );
};
