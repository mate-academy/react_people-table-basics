import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { NOT_SET_VALUE, tableColumnNames } from '../../utils/constants';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumnNames.map(name => (
            <th key={name}>
              {name}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classnames({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : motherName || NOT_SET_VALUE}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || NOT_SET_VALUE}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
