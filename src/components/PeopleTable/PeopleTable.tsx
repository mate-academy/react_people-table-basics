import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[] | null;
};

export function PeopleTable({ people }: Props) {
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
        {people?.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink
                name={person.name}
                sex={person.sex}
                to={person.slug}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink
                  name={person.mother.name}
                  sex={person.mother.sex}
                  to={person.mother.slug}
                />
              ) : (
                person?.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink
                  name={person.father.name}
                  sex={person.father.sex}
                  to={person.father.slug}
                />
              ) : (
                person?.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
