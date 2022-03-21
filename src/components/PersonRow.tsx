import { People } from '../types/People';

type Props = {
  person: People,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person" key={person.name}>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
};
