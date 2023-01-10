import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { ParentLink } from '../ParentLink/Parentlink';

type Props = {
  persons: Person[];
  selectedPerson: string;
};

export const PeopleTable: React.FC<Props> = ({
  persons,
  selectedPerson,
}) => {
  const getParent = (parent: string | null) => {
    return persons.find(person => person.name === parent);
  };

  const activePeople = persons.find(person => person.slug === selectedPerson);

  return (
    <div className="block">
      <div className="box table-container">
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
            {persons.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': person.slug === activePeople?.slug,
                })}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}`}
                    className={classNames({
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <ParentLink
                  parent={person.motherName}
                  getParent={getParent}
                />

                <ParentLink
                  parent={person.motherName}
                  getParent={getParent}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
