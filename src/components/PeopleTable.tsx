import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
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
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} person={mother} />
              </td>
              <td>
                <PersonLink name={person.fatherName} person={father} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
