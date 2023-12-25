import { useParams } from 'react-router-dom';
import cn from 'classnames';

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
        {people.map(person => (
          <tr
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <PersonLink person={person} />

            <td>{person.sex}</td>

            <td>{person.born}</td>

            <td>{person.died}</td>

            {person.motherName ? (
              <PersonLink person={
                people.find(
                  possibleMother => possibleMother.name === person.motherName,
                ) || person.motherName
              }
              />
            ) : (
              <td>
                -
              </td>
            )}

            {person.fatherName ? (
              <PersonLink person={
                people.find(
                  possibleFather => possibleFather.name === person.fatherName,
                ) || person.fatherName
              }
              />
            ) : (
              <td>
                -
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
