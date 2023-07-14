import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonItem: FC<Props> = ({ person }) => {
  const { slug: currentSlug } = useParams();
  const femaleSex = 'f';
  const emptyCell = '-';
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    name,
    slug,
  } = person;

  const isSelectedPerson = slug === currentSlug;
  const isPersonFemale = sex === femaleSex;

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
            to={slug}
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

          {!mother && (motherName || emptyCell)}
        </td>

        <td>
          {father && (
            <Link
              to={`/people/${father.slug}`}
            >
              {fatherName}
            </Link>
          )}

          {!father && (fatherName || emptyCell)}
        </td>
      </tr>
    </>
  );
};
