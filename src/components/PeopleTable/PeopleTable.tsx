import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  slug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
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
          return (
            <tr
              data-cy="person"
              className={person.slug === slug ? 'has-background-warning' : ''}
              key={person.name}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
