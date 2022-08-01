import { Person } from '../react-app-env';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="tr">
      <td className="td">{person.name}</td>
      <td className="td">{person.sex}</td>
      <td className="td">{person.born}</td>
      <td className="td">{person.died}</td>
      <td className="td">{person.motherName}</td>
      <td className="td">{person.fatherName}</td>
    </tr>
  );
};
