import { FC } from 'react';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { ParentLink } from '../ParentLink/ParentLink';
import { PersonInfoProps } from '../PeoplePage.types';

export const PersonInfo: FC<PersonInfoProps> = ({
  person, selectedPersonSlug,
}) => {
  const {
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    mother,
    father,
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
        <ParentLink
          parentName={motherName}
          parent={mother}
        />
      </td>
      <td>
        <ParentLink
          parentName={fatherName}
          parent={father}
        />
      </td>
    </tr>
  );
};
