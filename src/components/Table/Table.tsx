import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

interface Props {
  people:Person[];
}
export const Table: React.FC<Props> = ({ people }) => {
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
        {people.map((person) => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const mother = people
            .find(({ name }) => name === motherName);
          const father = people
            .find(({ name }) => name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn(
                { 'has-background-warning': slug === personSlug },
              )}
            >
              <td aria-label="Person link">
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                { mother
                  ? (
                    <PersonLink person={mother} />

                  ) : (
                    motherName || '-'
                  )}
              </td>

              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  ) : (
                    fatherName || '-'
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
