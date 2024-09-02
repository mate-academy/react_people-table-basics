import classNames from 'classnames';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

interface PersonProps {
  person: Person;
  getParent: (name: string) => Person | undefined;
}
export const PersonLink: React.FC<PersonProps> = ({ person, getParent }) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;
  const { slugs } = useParams();

  const motherPerson = motherName ? getParent(motherName) : null;
  const fatherPerson = fatherName ? getParent(fatherName) : null;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === slugs,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {motherPerson ? (
        <td>
          <Link className="has-text-danger" to={`/people/${motherPerson.slug}`}>
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || `-`}</td>
      )}
      {fatherPerson ? (
        <td>
          <Link to={`/people/${fatherPerson.slug}`}>{fatherName}</Link>
        </td>
      ) : (
        <td>{fatherName || `-`}</td>
      )}
    </tr>
  );
};
