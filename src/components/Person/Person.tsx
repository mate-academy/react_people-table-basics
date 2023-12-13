import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({
  person: {
    sex,
    slug: currentSlug,
    name,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  },
}) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={
        classNames({ 'has-background-warning': currentSlug === slug })
      }
    >
      <td>
        <Link
          to={`./${currentSlug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <Link
              to={`./${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          ) : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <Link
              to={`./${father.slug}`}
            >
              {fatherName}
            </Link>
          ) : fatherName || '-'}
      </td>
    </tr>
  );
};
