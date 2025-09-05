import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};
export function PeopleTable({ people }: Props) {
  const { personId } = useParams();

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
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === personId,
            })}
          >
            <td>
              <PersonLink
                person={{
                  name: person.name,
                  sex: person.sex,
                  slug: person.slug,
                }}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                person.mother ? (
                  <PersonLink
                    person={{
                      name: person.motherName,
                      sex: 'f',
                      slug: person.mother?.slug,
                    }}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                person.father ? (
                  <PersonLink
                    person={{
                      name: person.fatherName,
                      sex: 'm',
                      slug: person.father?.slug,
                    }}
                  />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
