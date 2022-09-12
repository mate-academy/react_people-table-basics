import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  people: Person[];
  selectedPerson: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
}) => {
  const isSelected = (personName: Person) => personName.slug === selectedPerson;

  const getPersonParent = (parentName: string | null) => {
    return people.find(person => person.name === parentName);
  };

  const isExistInTable = (parentName: string | null) => {
    return people.some(person => person.name === parentName);
  };

  return (
    <>
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )
        : (
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
                    'has-background-warning': isSelected(person),
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

                  <td>
                    {isExistInTable(person.motherName) ? (
                      <Link
                        to={`/people/${getPersonParent(person.motherName)?.slug}`}
                        className="has-text-danger"
                      >
                        {person.motherName}
                      </Link>
                    )
                      : (
                        <span>
                          {person.motherName || '-'}
                        </span>
                      )}
                  </td>

                  <td>
                    {isExistInTable(person.fatherName) ? (
                      <Link
                        to={`/people/${getPersonParent(person.fatherName)?.slug}`}
                      >
                        {person.fatherName}
                      </Link>
                    )
                      : (
                        <span>
                          {person.fatherName || '-'}
                        </span>
                      )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
