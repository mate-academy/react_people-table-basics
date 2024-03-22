import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

interface Props {
  person: Person;
  people: Person[];
}
export const PersonInfo: React.FC<Props> = ({ person, people }) => {
  const { sex, born, died, name, fatherName, motherName, slug } = person;

  const female = 'f';

  const motherSlug = people.find(
    ({ name: personName }) => personName === motherName,
  );

  const fatherSlug = people.find(
    ({ name: personName }) => personName === fatherName,
  );

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === female })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>
        {motherSlug ? (
          <Link className="has-text-danger" to={`/people/${motherSlug.slug}`}>
            {motherSlug.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {fatherSlug ? (
          <Link to={`/people/${fatherSlug.slug}`}>{fatherSlug.name}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
