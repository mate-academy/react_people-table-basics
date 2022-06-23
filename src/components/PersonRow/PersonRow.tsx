import { Person } from '../../react-app-env';

type Props = {
  person: Person
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person">
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.father?.name || '-'}</td>
      <td>{person.mother?.name || '-'}</td>
    </tr>
  );
};
