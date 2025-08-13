import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import PersonLink from '../PersonLink/PersonLink';
import classNames from 'classnames';

const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug } = useParams();

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
            key={person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName || '-'} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName || '-'} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
