import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { ErrorComponent } from './ErrorComponent';
import { PersonLink } from './PersonLink';

interface TableComponentProps {
  people: Person[];
  isLoadingError: boolean;
}

export function TableComponent({
  people,
  isLoadingError,
}: TableComponentProps) {
  const { slug } = useParams();

  return (
    <>
      <ErrorComponent
        isLoadingError={isLoadingError}
        hasNoPeople={people.length === 0}
      />
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
                className={`${person.slug === slug ? 'has-background-warning' : ''}`}
                data-cy="person"
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
