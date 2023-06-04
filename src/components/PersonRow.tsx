import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  persons: Person[];
  personSlug : string
};

export const PersonRow:FC<Props> = ({ person, persons, personSlug }) => {
  const findParents = (nameParent: string) => {
    const parentsLink = persons
      .find(onePerson => onePerson.name === nameParent);

    if (parentsLink) {
      return (
        <PersonLink
          link={`/people/${parentsLink.slug}`}
          text={parentsLink.name}
          personSex={parentsLink.sex}
        />
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
        <PersonLink
          link={`/people/${person.slug}`}
          text={person.name}
          personSex={person.sex}
        />
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
