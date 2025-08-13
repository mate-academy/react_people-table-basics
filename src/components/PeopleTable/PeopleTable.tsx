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
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                people.find(p => p.name === person.motherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.motherName)!}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                people.find(p => p.name === person.fatherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.fatherName)!}
                  />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
