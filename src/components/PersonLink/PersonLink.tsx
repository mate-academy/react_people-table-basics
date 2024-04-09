import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

const NO_PARENTS = '-';
const FEMALE = 'f';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { name, sex, born, died, fatherName, motherName, mother, father } =
    person;
  const female = sex === FEMALE;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={person.slug}
          className={classNames({
            'has-text-danger': female,
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          motherName || NO_PARENTS
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          fatherName || NO_PARENTS
        )}
      </td>
    </tr>
  );
};
