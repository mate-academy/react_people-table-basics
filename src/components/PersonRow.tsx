import { Person } from '../types/People';

type Props = {
  person: Person;
};

const PersonRow = ({ person }: Props) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
};

export default PersonRow;
