import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  // const selectedPers = people.find(pers => pers.slug === personSlug);

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
            className={
              person.slug === personSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <Link
                className={person.sex === 'f' ? 'has-text-danger' : ''}
                to={`/people/${person.slug}`}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {people.find(persName => person.motherName === persName.name) ? (
                <PersonLink
                  person={people.find(p => p.name == person.motherName)!}
                />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {people.find(persName => person.fatherName === persName.name) ? (
                <PersonLink
                  person={people.find(p => p.name == person.fatherName)!}
                />
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
