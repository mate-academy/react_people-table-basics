import { useParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

const PersonLink = ({ person }: { person: Person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={cn({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </Link>
);

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const computedPeople = people.map(person => {
    const mother = people.find(per => per.name === person.motherName);
    const father = people.find(per => per.name === person.fatherName);

    return { ...person, mother, father };
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
        {computedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
