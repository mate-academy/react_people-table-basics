import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  persons: Person[];
  personSlug : string
};

export const PersonLink:FC<Props> = ({ person, persons, personSlug }) => {
  const findParents = (nameParent: string) => {
    const parentsLink = persons
      .find(onePerson => onePerson.name === nameParent);

    if (parentsLink) {
      return (
        <Link
          to={`/people/${parentsLink.slug}`}
          className={classNames({
            'has-text-danger': parentsLink.sex === 'f',
          })}
        >
          {parentsLink.name}
        </Link>
      );
    }

    return nameParent;
  };

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': personSlug === person.slug },
      )}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {
          person.motherName ? (
            findParents(`${person.motherName}`)
          ) : '-'
        }
      </td>

      <td>
        {
          person.fatherName ? (
            findParents(`${person.fatherName}`)
          ) : '-'
        }
      </td>
    </tr>
  );
};
