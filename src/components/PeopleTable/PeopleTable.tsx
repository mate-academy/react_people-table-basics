import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const preparedPeople = people.map((person, index, all) => {
    return {
      ...person,
      mother: person.motherName
        ? all.find(p => p.name === person.motherName)
        : undefined,
      father: person.fatherName
        ? all.find(p => p.name === person.fatherName)
        : undefined,
    };
  });

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
            data-cy="person"
            key={person.name}
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
            {person.mother ? (
              <td>
                <PersonLink person={person.mother} />
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}

            {person.father ? (
              <td>
                <PersonLink person={person.father} />
              </td>
            ) : (
              <td>{person.fatherName ?? '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
