import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Parents } from '../Parents';

export const PersonComponent: React.FC<{ person: Person }> = ({
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
      className={classNames({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <Link
          to={`${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{ born }</td>
      <td>{died}</td>
      <td>
        <Parents parentPerson={mother} parentName={motherName} />
      </td>
      <td>
        <Parents parentPerson={father} parentName={fatherName} />
      </td>
    </tr>
  );
};
