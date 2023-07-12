import { FC } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { peopleSlug } = useParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const currentRow = slug === peopleSlug;
  const isWoman = person.sex === 'f';
  const motherLabel = motherName || '-';
  const fatherLabel = fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': currentRow,
      })}

    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': isWoman,
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {person.mother ? (
          <Link
            to={`/people/${person.mother?.slug}`}
            className={classNames({
              'has-text-danger': motherLabel,
            })}
          >
            {motherLabel}
          </Link>
        ) : (
          `${motherLabel}`
        )}
      </td>
      <td>
        {person.father ? (
          <Link
            to={`/people/${person.father.slug}`}
          >
            {fatherLabel}
          </Link>
        ) : (
          `${fatherLabel}`
        )}
      </td>
    </tr>
  );
};
