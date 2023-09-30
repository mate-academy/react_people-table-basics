import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const selectedPerson = people.find(person => person.slug === personSlug);

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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === selectedPerson?.slug
              ? 'has-background-warning'
              : ''}
          >
            <PersonLink
              person={person}
            />

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {person.mother
              ? (
                <PersonLink person={person.mother} />
              ) : (
                <td>
                  {person.motherName || '-'}
                </td>
              )}
            {person.father
              ? (
                <PersonLink person={person.father} />
              ) : (
                <td>
                  {person.fatherName || '-'}
                </td>
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
