import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
}

export const PeopleTableRowData: FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <>
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (<PersonLink person={mother} />)
          : (motherName || '-')}
      </td>
      <td>
        {father
          ? (<PersonLink person={father} />)
          : (fatherName || '-')}
      </td>
    </>
  );
};
