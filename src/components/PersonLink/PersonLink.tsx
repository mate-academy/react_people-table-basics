import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, motherName, fatherName } = person;

  const { slug } = useParams();

  const motherSlug = people.find(item => item.name === motherName)?.slug;
  const fatherSlug = people.find(item => item.name === fatherName)?.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlug ? (
          <Link
            to={`../${motherSlug}`}
            className={classNames({ 'has-text-danger': motherSlug })}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {fatherSlug ? (
          <Link to={`../${fatherSlug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
