import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findParent = (name: string | null) => {
    return people.find(person => person.name === name);
  };

  return (
    <>
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
            const mother = findParent(person.motherName);
            const father = findParent(person.fatherName);

            return (
              <tr
                data-cy="person"
                className={classNames({
                  'has-background-warning': slug === person.slug,
                })}
                key={person.slug}
              >
                <td>
                  <NavLink
                    to={`/people/${person.slug}`}
                    className={classNames({
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </NavLink>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {mother ? (
                    <NavLink to={`/people/${mother.slug}`} className="has-text-danger">
                      {person.motherName || '-'}
                    </NavLink>
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {father ? (
                    <NavLink to={`/people/${father.slug}`}>
                      {person.fatherName || '-'}
                    </NavLink>
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
