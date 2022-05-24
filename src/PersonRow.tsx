import { People } from './type';

interface Props {
  person: People
}

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.fatherName}</td>
    <td>{person.motherName}</td>
  </tr>
);
