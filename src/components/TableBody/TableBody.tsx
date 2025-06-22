import { Person } from '../../types';
import cn from 'classnames';
import { ParentLink } from '../ParentLink/ParentLink';

interface TableBodyProps {
  people: Person[];
}

export const TableBody: React.FC<TableBodyProps> = ({ people }) => {
  return (
    <tbody>
      {people.map(person => (
        <tr data-cy="person" key={person.slug}>
          <td>
            <a
              href={`#/people/${person.slug}`}
              className={cn({ 'has-text-danger': person.sex === 'f' })}
            >
              {person.name}
            </a>
          </td>

          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            <ParentLink parentName={person.motherName} people={people} />
          </td>

          <td>
            <ParentLink parentName={person.fatherName} people={people} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
