import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const Human: React.FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug: personSlug,
  } = person;
  const { slug } = useParams();

  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={`/people/${personSlug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {motherName}
          </Link>
        ) : (
          <p>{motherName}</p>
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        ) : (
          <p>{fatherName}</p>
        )}
      </td>
    </tr>
  );
};
