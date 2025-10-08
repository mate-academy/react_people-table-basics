import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
type Props = {
  people: Person[];
  selectedSlug?: string | undefined;
};
export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const findPersonByName = (name: string) => {
    return people.find(person => person.name === name);
  };

  const renderPersonLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const person = findPersonByName(name);

    if (person) {
      return <PersonLink person={person} />;
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
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPersonLink(person.motherName)}</td>
            <td>{renderPersonLink(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
