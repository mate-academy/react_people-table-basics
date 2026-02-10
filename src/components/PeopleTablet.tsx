import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }: Props) => {
  const { slug } = useParams();

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
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink
                personSlug={person.slug}
                personName={person.name}
                personSex={person.sex}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {person.mother ? (
              <td>
                <PersonLink
                  personSlug={person.mother.slug}
                  personName={person.mother.name}
                  personSex={person.mother.sex}
                />
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}

            {person.father ? (
              <td>
                <PersonLink
                  personSlug={person.father.slug}
                  personName={person.father.name}
                  personSex={person.father.sex}
                />
              </td>
            ) : (
              <td>{person.fatherName || '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
