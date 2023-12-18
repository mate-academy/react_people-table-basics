import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const NOT_SET_VALUE = '-';
  const { humanId } = useParams();

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
        {people.map(person => {
          const {
            sex, born, died, slug, motherName,
            fatherName, mother, father,
          } = person;

          return (
            <tr
              data-cy="person"
              className={cn(
                { 'has-background-warning': slug === humanId },
              )}
            >
              <td aria-label="person">
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {
                  mother
                    ? <PersonLink person={mother} />
                    : motherName || NOT_SET_VALUE
                }
              </td>
              <td>
                {
                  father
                    ? <PersonLink person={father} />
                    : fatherName || NOT_SET_VALUE
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
