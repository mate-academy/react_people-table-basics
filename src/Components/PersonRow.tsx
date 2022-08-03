import { Person } from '../Types/Person';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    died,
    born,
    sex,
    motherName,
    fatherName,
  } = person;

  return (
    <tr>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
};
