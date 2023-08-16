import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  slugPerson: string,
};

export const PersonLink: React.FC<Props> = ({ person, slugPerson }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    slug,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slugPerson === slug })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {!motherName && '-'}

        {motherName && mother && (
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        )}

        {motherName && !mother && motherName}
      </td>
      <td>
        {!fatherName && '-'}

        {fatherName && father && (
          <Link
            to={`/people/${father.slug}`}
          >
            {father.name}
          </Link>
        )}

        {fatherName && !father && fatherName}
      </td>
    </tr>
  );
};
