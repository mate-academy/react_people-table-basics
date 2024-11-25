import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { pathname } = useLocation();

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
          const { slug, name, sex, born, died, motherName, fatherName } =
            person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': pathname === `/people/${slug}`,
              })}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {person.mother && (
                <td>
                  <PersonLink person={person.mother} />
                </td>
              )}
              {!person.mother && <td>{motherName || '-'}</td>}
              {person.father && (
                <td>
                  <PersonLink person={person.father} />
                </td>
              )}
              {!person.father && <td>{fatherName || '-'}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
