import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { findPerson } from '../../helpers/helperFunctions';
import { NO_VALUE } from '../../helpers/constants';

type Props = {
  people: Person[],
  person: Person,
  slug: string | null,
};

export const PersonRow: FC<Props> = ({ people, person, slug }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink
          slug={person.slug}
          sex={sex}
          title={name}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName
          ? findPerson(motherName, people)
          : NO_VALUE}
      </td>
      <td>
        {fatherName
          ? findPerson(fatherName, people)
          : NO_VALUE}
      </td>
    </tr>
  );
};
