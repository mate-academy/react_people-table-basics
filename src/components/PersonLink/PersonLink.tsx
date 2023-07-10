import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
  findMotherSlug: (person: Person) => string | null;
  findFatherSlug: (person: Person) => string | null;
  selectedPerson: string | undefined;
}

export const PersonLink: React.FC<Props> = ({
  person,
  findMotherSlug,
  findFatherSlug,
  selectedPerson,
}) => {
  const {
    name,
    slug,
    sex,
    born,
    died,
    fatherName,
    motherName,
  } = person;

  const motherSlug = findMotherSlug(person);
  const fatherSlug = findFatherSlug(person);

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': slug === selectedPerson,

      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
            'has-text-link': sex === 'm',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlug
          ? (
            <Link
              to={`/people/${motherSlug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )
          : motherName || '-'}

      </td>
      <td>
        {fatherSlug
          ? (
            <Link
              to={`/people/${fatherSlug}`}
              className="has-text-link"
            >
              {fatherName}
            </Link>
          )
          : fatherName || '-'}

      </td>
    </tr>
  );
};
