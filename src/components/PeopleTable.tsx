import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <PersonLink person={person} />
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother && <PersonLink person={person.mother} />}

            {!person.mother && person.motherName && (
              <td>{person.motherName}</td>
            )}

            {!person.mother && !person.motherName && <td>-</td>}

            {person.father && <PersonLink person={person.father} />}

            {!person.father && person.fatherName && (
              <td>{person.fatherName}</td>
            )}

            {!person.father && !person.fatherName && <td>-</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
