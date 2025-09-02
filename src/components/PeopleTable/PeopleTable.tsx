// components/PeopleTable.tsx
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => (
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
        // Знаходимо об'єкти батьків, якщо вони є у списку
        const motherObj = person.motherName
          ? people.find(p => p.name === person.motherName)
          : undefined;
        const fatherObj = person.fatherName
          ? people.find(p => p.name === person.fatherName)
          : undefined;

        const isSelected = selectedSlug === person.slug;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={isSelected ? 'has-background-warning' : ''}
          >
            {/* Ім'я самої людини */}
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {/* Мати */}
            <td>
              {person.motherName ? (
                motherObj ? (
                  // Якщо об'єкт матері знайдено, робимо посилання
                  <PersonLink person={motherObj} />
                ) : (
                  // Якщо в списку такий імені немає – просто текст (з класом, якщо жінка)
                  <span
                    className={
                      /* якщо стать матері відома та 'f'*/ motherObj?.sex ===
                      'f'
                        ? 'has-text-danger'
                        : ''
                    }
                  >
                    {person.motherName}
                  </span>
                )
              ) : (
                '-'
              )}
            </td>

            {/* Батько */}
            <td>
              {person.fatherName ? (
                fatherObj ? (
                  <PersonLink person={fatherObj} />
                ) : (
                  <span>{person.fatherName}</span>
                )
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
