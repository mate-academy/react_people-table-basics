import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selected?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selected }) => {
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
            className={classNames({
              'has-background-warning': person.slug === selected,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <PersonLink person={person.mother ?? person.motherName} />
            </td>

            <td>
              <PersonLink person={person.father ?? person.fatherName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
