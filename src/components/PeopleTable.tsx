import classNames from 'classnames';
import { Person } from '../types';
import PersonLink from './PersonLink';

type Props = {
  people: Person[];
  selectedPerson: string;
  onSelect: (name: string) => void;
};

export default function PeopleTable({
  people,
  selectedPerson,
  onSelect,
}: Props) {
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
            key={person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.name === selectedPerson,
            })}
          >
            <td>
              <PersonLink
                name={person.name}
                people={people}
                onSelect={onSelect}
              />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                name={person.motherName}
                people={people}
                onSelect={onSelect}
              />
            </td>
            <td>
              <PersonLink
                name={person.fatherName}
                people={people}
                onSelect={onSelect}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
