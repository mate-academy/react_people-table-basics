import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
  mother: Person | undefined,
  father: Person | undefined,
};

export const PersonInfo: React.FC<Props> = ({
  person,
  mother,
  father,
}) => {
  const { personSlug } = useParams();

  let motherElement;
  let fatherElement;

  switch (true) {
    case (mother !== undefined):
      motherElement = (
        <Link
          to={`${mother?.slug}`}
          className={cn({
            'has-text-danger': mother?.sex === 'f',
          })}
        >
          {mother?.name}
        </Link>
      );
      break;

    case (person.motherName !== null):
      motherElement = person.motherName;
      break;

    default:
      motherElement = '-';
      break;
  }

  switch (true) {
    case (father !== undefined):
      fatherElement = (
        <Link
          to={`${father?.slug}`}
        >
          {father?.name}
        </Link>
      );
      break;

    case (person.fatherName !== null):
      fatherElement = person.fatherName;
      break;

    default:
      fatherElement = '-';
      break;
  }

  return (
    <>
      <tr
        data-cy="person"
        className={cn({
          'has-background-warning': personSlug === person.slug,
        })}
      >
        <td>
          <Link
            to={`${person?.slug}`}
            className={cn({
              'has-text-danger': person.sex === 'f',
            })}
          >
            {person.name}
          </Link>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{motherElement}</td>
        <td>{fatherElement}</td>
      </tr>
    </>
  );
};
