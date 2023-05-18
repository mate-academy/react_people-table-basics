import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

const findParent = (people: Person[], parentName: string | null) => {
  const parent = people.find(person => person.name === parentName);

  if (parent) {
    return (
      <Link
        className={classNames({
          'has-text-danger': parent.sex === 'f',
        })}
        to={`/people/${parent.slug}`}
      >
        {parent.name}
      </Link>
    );
  }

  return parentName || '-';
};

export type Props = {
  people: Person[],
  selectedPerson: string,
};

export const PeopleList: React.FC<Props> = ({
  people,
  selectedPerson = '',
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
        {people.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson === person.slug,
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
                {findParent(people, person.motherName)}
              </td>

              <td>
                {findParent(people, person.fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
