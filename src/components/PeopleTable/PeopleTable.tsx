import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { ParentLink } from '../ParentLink';
import { PersonLink } from '../PersonLink';

type PeopleTableProps = {
  preparedPeople: Person[];
};

export function PeopleTable({ preparedPeople }: PeopleTableProps) {
  const { slug } = useParams<{ slug: string }>();

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
        {preparedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <ParentLink parent={person.mother} parentName={person.motherName} />
            <ParentLink parent={person.father} parentName={person.fatherName} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
