import { Person } from '../types';
import { getPersonSlug } from '../utils/PersonSlug';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  activePersonId?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, activePersonId }) => {
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
          const isActive = activePersonId === getPersonSlug(person);

          return (
            <tr
              data-cy="person"
              key={getPersonSlug(person)}
              className={isActive ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} people={people} />
              </td>
              <td>
                <PersonLink name={person.fatherName} people={people} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
