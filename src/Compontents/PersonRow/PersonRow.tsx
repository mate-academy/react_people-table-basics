import { Person } from '../../types/Person';
import './PersonRow.scss';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr className="person" key={person.id}>
    <td>
      name:
      {person.name}
    </td>
    <td>
      sex:
      {person.sex}
    </td>
    <td>
      born:
      {person.born}
    </td>
    <td>
      died:
      {person.died}
    </td>
    <td>
      mother:
      {person.motherName}
    </td>
    <td>
      father:
      {person.fatherName}
    </td>
  </tr>
);
