import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

export const PersonPage: React.FC<{ person: Person }> = ({
  person: {
    name,
    born,
    died,
    fatherName,
    motherName,
    sex,
    slug,
    mother,
    father,
  },
}) => {
  const { personSlug } = useParams();

  const renderParrents = (
    parrentPerson: Person | null = null,
    parrentName: string | null,
  ) => {
    if (parrentPerson) {
      return (
        <Link
          className={parrentPerson.sex === 'f' ? 'has-text-danger' : ''}
          to={parrentPerson.slug}
        >
          {parrentName}
        </Link>
      );
    }

    return parrentName || '-';
  };

  return (
    <tr
      data-cy="person"
      className={personSlug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`${slug}`}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{ born }</td>
      <td>{died}</td>
      <td>
        {renderParrents(mother, motherName)}
      </td>
      <td>
        {renderParrents(father, fatherName)}
      </td>
    </tr>
  );
};
