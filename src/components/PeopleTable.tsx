import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
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
            const slug = `${person.name.toLowerCase().replace(/\s+/g, '-')}-${person.born}`;
            const isSelected = slug === selectedSlug;

            return (
              <tr
                key={slug}
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
                  {person.motherName ? (
                    <PersonLink
                      person={people.find(p => p.name === person.motherName)}
                      name={person.motherName}
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    <PersonLink
                      person={people.find(p => p.name === person.fatherName)}
                      name={person.fatherName}
                    />
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
