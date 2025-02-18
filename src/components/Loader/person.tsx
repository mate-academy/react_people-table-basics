import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  mothers: Person[];
  fathers: Person[];
  currentPath: string;
};

export const People: React.FC<Props> = ({
  person,
  fathers,
  mothers,
  currentPath,
}) => {
  const currentParent = (parents: Person[], parentName: string | null) =>
    parents.map(parent => parent.name).includes(`${parentName}`);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': currentPath === `/people/${person.slug}`,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {currentParent(mothers, person.motherName) ? (
          <Link
            className="has-text-danger"
            to={`/people/${mothers.find(mother => mother.name === person.motherName)?.slug}`}
          >
            {person.motherName}
          </Link>
        ) : (
          `${person.motherName || '-'}`
        )}
      </td>

      <td>
        {currentParent(fathers, person.fatherName) ? (
          <Link
            to={`/people/${fathers.find(father => father.name === person.fatherName)?.slug}`}
          >
            {person.fatherName}
          </Link>
        ) : (
          `${person.fatherName || '-'}`
        )}
      </td>
    </tr>
  );
};
