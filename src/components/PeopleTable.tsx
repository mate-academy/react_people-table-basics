import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  const findPerson = (name: string | null): Person | undefined => {
    if (!name) {
      return undefined;
    }

    return people.find(p => p.name === name);
  };

  const renderParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = findPerson(name);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return name;
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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === slug ? 'has-background-warning' : undefined
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.motherName)}</td>
            <td>{renderParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
