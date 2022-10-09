import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink.tsx';

type Props = {
  people: Person[]
  selectedPerson: string
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const existingPerson = (personsParent: string | null) => {
    return people.find(person => person.name === personsParent);
  };

  const activePerson = people.find(
    person => person.slug === selectedPerson,
  );

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
            {people.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning':
                  person.slug === activePerson?.slug,
                })}
              >
                <td>
                  <Link
                    className={classNames(
                      { 'has-text-danger': person.sex === 'f' },
                    )}
                    to={`/people/${person.slug}`}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <PersonLink
                  parent={person.motherName}
                  existingPerson={existingPerson}
                />

                <PersonLink
                  parent={person.fatherName}
                  existingPerson={existingPerson}
                />
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};
