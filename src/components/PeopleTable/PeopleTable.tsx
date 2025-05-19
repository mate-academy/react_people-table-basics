import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface P {
  peoples: Person[];
}

const personToLink = (person: Person) => {
  return `${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`;
};

export function PeopleTable({ peoples }: P) {
  const { slug } = useParams();

  const nameLink = (person: Person | string) => {
    if (typeof person === 'string') {
      return person;
    }

    return (
      <NavLink
        to={`./${personToLink(person)}`}
        className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
      >
        {person.name}
      </NavLink>
    );
  };

  const parents = (name: string | null) => {
    return nameLink(peoples.find(p => p.name === name) || name || '-');
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={`${personToLink(person) === slug ? 'has-background-warning' : ''}`}
          >
            <td>{nameLink(person)}</td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{parents(person.motherName)}</td>
            <td>{parents(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
