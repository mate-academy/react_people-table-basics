import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const { personSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
      "
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
            slug,
            sex,
            born,
            died,
          } = person;

          const mother = people.find(
            possibleMother => possibleMother.name === person.motherName,
          );

          const motherName = mother
            ? <PersonLink person={mother} />
            : <td>{person.motherName}</td>;

          const father = people.find(
            possibleFather => possibleFather.name === person.fatherName,
          );

          const fatherName = father
            ? <PersonLink person={father} />
            : <td>{person.fatherName}</td>;

          return (
            (
              <tr
                data-cy="person"
                className={cn({
                  'has-background-warning': slug === personSlug,
                })}
                key={slug}
              >
                <PersonLink person={person} />

                <td>{sex}</td>

                <td>{born}</td>

                <td>{died}</td>

                {person.motherName ? (
                  motherName
                ) : (
                  <td>
                    -
                  </td>
                )}

                {person.fatherName ? (
                  fatherName
                ) : (
                  <td>
                    -
                  </td>
                )}
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
};
