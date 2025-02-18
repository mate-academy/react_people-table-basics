import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();

  const peopleMap: Record<string, Person> = {};

  people.forEach(person => {
    peopleMap[person.name] = person;
  });

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
          const {
            slug: personSlug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = motherName ? peopleMap[motherName] : null;
          const father = fatherName ? peopleMap[fatherName] : null;

          return (
            <tr
              data-cy="person"
              key={personSlug}
              className={cn({ 'has-background-warning': personSlug === slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
