import { Person } from '../types/Person';

type Props = {
  person: Person,
};

const TableBody: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName && motherName}</td>
      <td>{fatherName && fatherName}</td>
    </>
  );
};

export default TableBody;
