import { Link, NavLink } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
  isSelected?: boolean | null;
};

export const PersonInfo: React.FC<Props> = ({ person, people, isSelected }) => {
  const renderPersonName = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const foundPerson = people.find(persons => persons.name === name);

    return foundPerson ? (
      <NavLink
        to={`/people/${foundPerson.slug}`}
        className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
      >
        {name}
      </NavLink>
    ) : (
      name
    );
  };

  return (
    <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
      <td>
        <Link
          to={`${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderPersonName(person.motherName)}</td>
      <td>{renderPersonName(person.fatherName)}</td>
    </tr>
  );
};
