import { FC } from 'react';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Parent } from '../Parent/Parent';
import { PersonInfoProps } from '../PeoplePage.types';

export const PersonInfo: FC<PersonInfoProps> = ({
  person, selectedPersonSlug, people,
}) => {
  const {
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPersonSlug === slug,
      })}
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <Parent
          parentName={motherName}
          people={people}
        />
      </td>
      <td>
        <Parent
          parentName={fatherName}
          people={people}
        />
      </td>
    </tr>
  );
};
