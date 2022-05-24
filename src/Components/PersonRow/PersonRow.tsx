import { FC } from 'react';
import './PersonRow.scss';

type Props = {
  person: PeopleType
};

export const PersonRow: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <tr className="person-row">
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName || '-/-'}</td>
      <td>{fatherName || '-/-'}</td>
    </tr>
  );
};
