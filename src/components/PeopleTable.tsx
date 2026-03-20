import classNames from 'classnames';
import { Person } from '../types';
import PersonLink from './PersonLink';

type Props = {
  people: Person[];
  selectedPerson: string;
};

export default function PeopleTable({ people, selectedPerson }: Props) {
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
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              key={person.name}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.name === selectedPerson,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : person.motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
