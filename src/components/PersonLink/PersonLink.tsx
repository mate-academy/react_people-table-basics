import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const personSlug = useParams();
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames(
        {
          'has-background-warning': personSlug.slug === slug,
        },
      )}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames(
            {
              'has-text-danger': sex === 'f',
            },
          )}
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
        {mother
          ? (
            <Link
              to={`../${mother.slug}`}
              className="has-text-danger"
            >
              {mother.name}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <Link to={`../${father.slug}`}>
              {father.name}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
