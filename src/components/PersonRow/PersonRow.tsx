import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectPerson: (slug: string) => void;
};

export const PersonRow: React.FC<Props> = ({ person, selectPerson }) => {
  return (
    <tr
      className={cn({ 'has-background-warning': person.selected })}
      onClick={() => selectPerson(person.slug)}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName || '-'}</td>
      <td>{person.fatherName || '-'}</td>
    </tr>
  );
};
