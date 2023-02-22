import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';
import { PersonNavLink } from '../PersonNavLink';

type Props = {
  person: Person,
  selectedSlug: string,
  mother: Person | undefined,
  father: Person | undefined,
};

export const PersonItem: FC<Props> = ({
  person,
  selectedSlug,
  mother,
  father,
}) => {
  const isSelectedPerson = person.slug === selectedSlug;
  const personMotherName = person.motherName || '-';
  const personFatherName = person.fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelectedPerson })}
    >
      <td>
        <PersonNavLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? (
            <PersonNavLink person={mother} />
          ) : (
            personMotherName
          )}
      </td>
      <td>
        {father
          ? (
            <PersonNavLink person={father} />
          ) : (
            personFatherName
          )}
      </td>
    </tr>
  );
};
