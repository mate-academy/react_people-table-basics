import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';
import { PersonNavLink } from '../PersonNavlink';

type Props = {
  people: Person[],
  person: Person,
  selectedSlug: string,
};

export const PersonItem: FC<Props> = ({
  people,
  person,
  selectedSlug,
}) => {
  const isSelectedPerson = person.slug === selectedSlug;
  const personMotherName = person.motherName || '-';
  const personFatherName = person.fatherName || '-';

  const personMother = people
    .find((personItem: Person) => personItem.name === person.motherName);
  const personFather = people
    .find((personItem: Person) => personItem.name === person.fatherName);

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
        {personMother
          ? (
            <PersonNavLink person={personMother} />
          ) : (
            personMotherName
          )}
      </td>
      <td>
        {personFather
          ? (
            <PersonNavLink person={personFather} />
          ) : (
            personFatherName
          )}
      </td>
    </tr>
  );
};
