import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug } = useParams();

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
              key={person.slug}
              data-cy="person"
              className={
                person.slug === slug ? 'has-background-warning' : undefined
              }
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                <PersonLink person={mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
