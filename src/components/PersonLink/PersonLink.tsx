import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  selectedPerson: string,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({
  person,
  selectedPerson,
  people,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const mother = people.find((p) => p.name === motherName);
  const father = people.find((p) => p.name === fatherName);

  const isSelected = slug === selectedPerson;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <Link
          to={`./${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherName
          ? (
            <>
              {mother?.slug
                ? (
                  <Link
                    to={`./${mother?.slug}`}
                    className="has-text-danger"
                  >
                    {motherName}
                  </Link>
                )
                : <p>{motherName}</p>}
            </>
          )
          : <p> - </p>}
      </td>

      <td>
        {fatherName
          ? (
            <>
              {father?.slug
                ? (
                  <Link
                    to={`./${father?.slug}`}
                    className="has-text-danger"
                  >
                    {fatherName}
                  </Link>
                )
                : <p>{fatherName}</p>}
            </>
          )
          : <p> - </p>}
      </td>
    </tr>
  );
};
