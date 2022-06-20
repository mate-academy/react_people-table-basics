import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name, sex, born, died, motherName, fatherName,
  } = person;

  return (
    <tr
      key={`${born}${died}`}
      className="Person"
    >
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
};
