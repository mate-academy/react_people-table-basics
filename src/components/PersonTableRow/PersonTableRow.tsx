import { FC } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { usePeopleContext } from '../../contexts/PeopleContext';

interface Props {
  person: Person
}

export const PersonTableRow: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const { people } = usePeopleContext();

  const father = people
    .find(fatherToFind => fatherToFind.name === person.fatherName || null);

  const mother = people
    .find(motherToFind => motherToFind.name === person.motherName || null);

  const { personSlug } = useParams();

  const selectedPerson = people
    .find(personToFind => personToFind.slug === personSlug);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPerson?.slug === slug,
      })}
    >

      <td>
        <Link
          to={`../${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={`../${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={`../${father.slug}`}
          >
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>

  );
};
