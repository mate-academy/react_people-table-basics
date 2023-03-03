import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonNavLink } from '../PersonNavlink';

type Props = {
  person: Person,
  motherName: string | null,
  fatherName: string | null,
  mother: Person | undefined,
  father: Person | undefined,
};

export const PersonItem: FC<Props> = ({
  person,
  motherName,
  fatherName,
  mother,
  father,
}) => {
  const { slug = '' } = useParams();
  const isSelectedPerson = person.slug === slug;
  const personMotherName = motherName || '-';
  const personFatherName = fatherName || '-';

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
