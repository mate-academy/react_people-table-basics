import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  visiblePeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople }) => {
  const { slug } = useParams<{ slug: string }>();

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
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={slug === person.slug
              ? 'has-background-warning'
              : ''}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? (
                  <PersonLink
                    person={person.mother}
                  />
                )
                : person.motherName || '-'}
            </td>
            <td>
              {person.father
                ? (
                  <PersonLink
                    person={person.father}
                  />
                )
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
