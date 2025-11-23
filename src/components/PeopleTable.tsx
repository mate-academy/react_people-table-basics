import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  return (
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

            const motherContent = person.mother ? (
              <PersonLink person={person.mother} />
            ) : (
              person.motherName || '-'
            );

            const fatherContent = person.father ? (
              <PersonLink person={person.father} />
            ) : (
              person.fatherName || '-'
            );

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={isSelected ? 'has-background-warning' : ''}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>{motherContent}</td>
                <td>{fatherContent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
