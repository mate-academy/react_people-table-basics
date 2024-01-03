import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface PeopleTableProps {
  people: Person[];
  person: Person;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people, person }) => {
  const mother = people.find(mum => mum.name === person.motherName);
  const father = people.find(dad => dad.name === person.fatherName);

  return (
    <tr data-cy="person">
      <td>
        <a
          className={cn({
            'has-text-danger': person.sex === 'm',
          })}
          href={`#/people/${person.slug}`}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {mother ? (
        <td>
          <Link to={`../${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`../${father.slug}`}>
            {father.name}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
