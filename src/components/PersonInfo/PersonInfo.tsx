import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  slug: string,
  personMother: Person | undefined,
  personFather: Person | undefined,
};

export const PersonInfo: React.FC<Props> = ({
  person,
  slug,
  personMother,
  personFather,
}) => {
  const personMotherName = person.motherName || '-';
  const personFatherName = person.fatherName || '-';

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames(
        { 'has-background-warning': person.slug === slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {personMother
          ? (<PersonLink person={personMother} />)
          : (personMotherName)}
      </td>
      <td>
        {personFather
          ? (<PersonLink person={personFather} />)
          : (personFatherName)}
      </td>
    </tr>
  );
};
