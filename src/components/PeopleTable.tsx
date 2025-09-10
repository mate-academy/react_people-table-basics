import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC<{
  people: Person[];
  selectedSlug?: string;
}> = ({ people, selectedSlug }) => {
  const peopleByName = people.reduce<Record<string, Person>>(
    (acc, person) => ({
      ...acc,
      [person.name]: person,
    }),
    {},
  );

  return (
    <div className="block">
      <div className="box table-container">
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
              const isSelected = person.slug === selectedSlug;
              const mother = person.motherName
                ? peopleByName[person.motherName]
                : undefined;
              const father = person.fatherName
                ? peopleByName[person.fatherName]
                : undefined;

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={isSelected ? 'has-background-warning' : ''}
                >
                  <td>
                    <Link
                      to={`/people/${person.slug}`}
                      className={person.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      <PersonLink person={mother} name={person.motherName} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.fatherName ? (
                      <PersonLink person={father} name={person.fatherName} />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
