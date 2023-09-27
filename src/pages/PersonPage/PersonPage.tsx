import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { ParentsPage } from '../ParrentsPage';

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
        <ParentsPage parentPerson={mother} parentName={motherName} />
      </td>
      <td>
        <ParentsPage parentPerson={father} parentName={fatherName} />
      </td>
    </tr>
  );
};
