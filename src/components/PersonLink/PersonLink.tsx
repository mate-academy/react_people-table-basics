import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName, mother, father } =
    person;

  const validatedMotherName = motherName || '-';
  const validatedFatherName = fatherName || '-';

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`./${person.slug}`}
          className={classNames({
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
          <Link to={`./${mother.slug}`} className="has-text-danger">
            {validatedMotherName}
          </Link>
        </td>
      ) : (
        <td>{validatedMotherName}</td>
      )}

      {father ? (
        <td>
          <Link to={`./${father.slug}`}>{validatedFatherName}</Link>
        </td>
      ) : (
        <td>{validatedFatherName}</td>
      )}
    </tr>
  );
};
