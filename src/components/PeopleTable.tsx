import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

const columnHeadings = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

type Props = {
  people: Person[];
  selected?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selected }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnHeadings.map(heading => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === selected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                <PersonLink person={mother ?? motherName} />
              </td>

              <td>
                <PersonLink person={father ?? fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
