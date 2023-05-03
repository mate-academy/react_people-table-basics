import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    slug,
  } = person;

  const { personSlug } = useParams();

  const isSelected = slug === personSlug;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>
        {sex}
      </td>

      <td>
        {born}
      </td>

      <td>
        {died}
      </td>

      <td>
        {mother ? (
          <Link to={`../${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`../${father.slug}`}>
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
