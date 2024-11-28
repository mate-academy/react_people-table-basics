import { PersonLink } from '../PeoplePage/PersonLink';
import { Person } from '../../types/Person';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  people: Person[];
  selectedPerson: string | null;
  onPersonSelect: (person: Person) => void;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  onPersonSelect,
}) => {
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
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedPerson,
            })}
            onClick={() => onPersonSelect(person)}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                  onClick={e => {
                    e.stopPropagation();
                    if (person.mother) {
                      onPersonSelect(person.mother);
                    }
                  }}
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link
                  to={`/people/${person.father.slug}`}
                  onClick={e => {
                    e.stopPropagation();
                    if (person.mother) {
                      onPersonSelect(person.mother);
                    }
                  }}
                >
                  {person.fatherName}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
