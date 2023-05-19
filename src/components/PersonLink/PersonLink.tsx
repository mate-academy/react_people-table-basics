import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
  personSlug: string | undefined;
}

export const PersonLink: React.FC<Props> = ({ person, personSlug }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;
  const currentSlug = personSlug === slug;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({ 'has-background-warning': currentSlug })}
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
      <td>{motherName || '-'}</td>
      <td>{fatherName || '-'}</td>
    </tr>
  );
};
