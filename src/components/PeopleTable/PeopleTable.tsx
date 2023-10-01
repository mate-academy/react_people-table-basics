import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { EMPTY } from '../../utils/consts';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId = '' } = useParams();

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

        <tbody>
          {people.map((person) => (
            <tr
              data-cy="person"
              className={
                classNames({
                  'has-background-warning': personId === person.slug,
                })
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? (
                    <PersonLink person={person.mother} />
                  )
                  : (
                    person.motherName || EMPTY
                  )}
              </td>
              <td>
                {person.father
                  ? (
                    <PersonLink person={person.father} />
                  )
                  : (
                    person.fatherName || EMPTY
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </thead>
    </table>
  );
};
