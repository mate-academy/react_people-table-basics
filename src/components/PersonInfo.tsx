import { FC } from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonInfo: FC<Props> = ({ person, people }) => {
  const { sex, born, died, name, fatherName, motherName, slug } = person;
  const { personSlug } = useParams();
  const FEMALE = 'f';

  const motherSlug = people.find(
    ({ name: nameOfPerson }) => nameOfPerson === motherName,
  );

  const fatherSlug = people.find(
    ({ name: nameOfPerson }) => nameOfPerson === fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === FEMALE })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>
        {motherSlug ? (
          <Link className="has-text-danger" to={`/people/${motherSlug.slug}`}>
            {motherSlug.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {fatherSlug ? (
          <Link to={`/people/${fatherSlug.slug}`}>{fatherSlug.name}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
