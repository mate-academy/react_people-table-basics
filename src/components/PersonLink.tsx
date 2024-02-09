import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  personSlug?: string;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({
  people,
  person,
  personSlug,
}) => {
  const {
    sex,
    name,
    motherName,
    fatherName,
    slug,
    born,
    died,
  } = person;
  const isFemale = person.sex === 'f' ? 'has-text-danger' : '';
  const selectPerson
 = slug === personSlug
 || motherName === personSlug
  || fatherName === personSlug ? 'has-background-warning' : '';
  const father = people.find(
    dad => dad.name === fatherName,
  )?.slug;

  const mother = people.find(
    mom => mom.name === motherName,
  )?.slug;

  return (
    <tr
      data-cy="person"
      className={cn(selectPerson)}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={isFemale}
          key={personSlug}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          <Link
            to={`/people/${mother}`}
            className={isFemale}
            key={personSlug}
          >
            {motherName}
          </Link>
        ) : (<>{motherName || '-'}</>)}
      </td>
      <td>
        {fatherName ? (
          <Link
            to={`/people/${father}`}
            className={isFemale}
            key={personSlug}
          >
            {fatherName}
          </Link>
        ) : (<>{fatherName || '-'}</>)}
      </td>
    </tr>
  );
};
