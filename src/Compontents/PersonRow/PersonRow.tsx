import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <>
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
  </>
);
