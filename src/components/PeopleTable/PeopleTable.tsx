import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  selectedPerson: string | undefined;
}

const subtitles = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {subtitles.map(subtitle => (
            <th
              key={subtitle}
            >
              {subtitle}
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
            slug,
            motherName,
            fatherName,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === selectedPerson,

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
                  ? (
                    <PersonLink person={mother} />
                  )
                  : motherName || '-'}

              </td>
              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  )
                  : fatherName || '-'}

              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
