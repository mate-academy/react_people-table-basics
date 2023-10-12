import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';

type TTableItemProps = {
  person: Person;
  people: Person[];
};

enum ESex {
  Female = 'f',
}

export const TableItem: FC<TTableItemProps> = ({ person, people }) => {
  const {
    name: PersonName,
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName,
  } = person;

  const { peopleId } = useParams();

  const mother = people.find(({ name }) => name === motherName);

  const father = people.find(({ name }) => name === fatherName);

  const NON_SELECTED_USER = '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': peopleId === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === ESex.Female,
          })}
        >
          {PersonName}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            className="has-text-danger"
            to={`/people/${mother?.slug}`}
          >
            {motherName}
          </Link>
        ) : (
          motherName || NON_SELECTED_USER
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={`/people/${father?.slug}`}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName || NON_SELECTED_USER
        )}
      </td>
    </tr>
  );
};
