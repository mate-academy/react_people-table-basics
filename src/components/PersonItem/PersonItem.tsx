import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  return (
    <tr data-cy="person">
      <td>
        <Link to={`/people/${person.slug}`}>{person.name}</Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        <Link className="has-text-danger" to={`/people/${person.mother?.slug}`}>
          {person.motherName}
        </Link>
      </td>

      <td>
        <Link to={`/people/${person.father?.slug}`}>{person.fatherName}</Link>
      </td>
    </tr>
  );
};
