import { Person } from '../../react-app-env';

interface Props {
  person: Person,
}

export const PersonRow:React.FC<Props> = ({ person }) => (
  <tr className="Person">
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother?.name || '-'}</td>
    <td>{person.father?.name || '-'}</td>
  </tr>
);
