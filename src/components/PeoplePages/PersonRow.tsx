import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person,
  mother: Person | null
  father: Person | null
}

export const PersonRow: React.FC<Props> = ({ person, mother, father }) => {
  return (
    <>
      <tr>
        <th>{person.name}</th>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>
          {mother
            ? (<Link to={mother.slug}>{person.motherName}</Link>)
            : (person.motherName)}
        </td>
        <td>
          {father
            ? (<Link to={father.slug}>{person.fatherName}</Link>)
            : (person.fatherName)}
        </td>
      </tr>
    </>
  );
};
