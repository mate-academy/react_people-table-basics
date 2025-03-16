import classNames from 'classnames';
import { Person } from '../types';
import { Link, NavLink, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();

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
        {people.map((person, index) => {
          const { name, sex, born, died, fatherName, motherName } = person;
          const hyphenedName =
            name.toLowerCase().replace(/\s/g, '-') + '-' + born;
          const chosenPerson = classNames({
            'has-background-warning': personId === hyphenedName,
          });
          const mother = people.find(el => motherName === el.name);
          const father = people.find(el => fatherName === el.name);

          return (
            <tr data-cy="person" key={index} className={chosenPerson}>
              <td>
                <NavLink
                  to={`/people/${hyphenedName}`}
                  className={classNames({ 'has-text-danger': sex === 'f' })}
                >
                  {name}
                </NavLink>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${mother.name.toLocaleLowerCase().replace(/\s/g, '-')}-${mother.born}`}
                  >
                    {mother.name}
                  </Link>
                ) : motherName ? (
                  motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={`/people/${father.name.toLowerCase().replace(/\s/g, '-')}-${father.born}`}
                  >
                    {father.name}
                  </Link>
                ) : fatherName ? (
                  fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
