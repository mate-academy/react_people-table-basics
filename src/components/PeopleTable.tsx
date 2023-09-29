import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

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
