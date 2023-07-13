import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonItem: FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const isSelectedPerson = person.slug === slug;
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    name,
  } = person;

  const isPersonFemale = sex === 'f';

  return (
    <>
      <tr
        data-cy="person"
        className={cn(
          { 'has-background-warning': isSelectedPerson },
        )}
      >
        <td>
          <Link
            to={person.slug}
            className={cn(
              { 'has-text-danger': isPersonFemale },
            )}
          >
            {name}
          </Link>
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother && (
            <Link
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )}

          {!mother && (motherName || '-')}
        </td>

        <td>
          {father && (
            <Link
              to={`/people/${father.slug}`}
            >
              {fatherName}
            </Link>
          )}

          {!father && (fatherName || '-')}
        </td>
      </tr>
    </>
  );
};
