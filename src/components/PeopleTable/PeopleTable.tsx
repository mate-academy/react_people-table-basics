import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface PropsPeople {
  people: Person[];
}

export const PeopleTable = ({ people }: PropsPeople) => {
  const { personSlug } = useParams();

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
          const isSelected = person.slug === personSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {/* Передаємо чисті значення без `` */}
                <PersonLink
                  person={person.mother}
                  name={person.motherName || undefined}
                />
              </td>
              <td>
                <PersonLink
                  person={person.father}
                  name={person.fatherName || undefined}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
