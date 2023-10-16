import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  peoples: Person[],
};

function getParent(name: string | null, arr: Person[]) {
  return arr.find(person => person.name === name);
}

export const PeoplesList: React.FC<Props> = ({ peoples }) => {
  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug;

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
        {peoples.map((person) => {
          const mother = getParent(person.motherName, peoples);
          const father = getParent(person.fatherName, peoples);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPersonSlug === person.slug,
              })}
            >
              <td>
                <NavLink
                  to={person.slug}
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

              {person.motherName ? (
                <td>
                  {mother ? (
                    <NavLink
                      className="has-text-danger"
                      to={`${mother.slug}`}
                    >
                      {person.motherName}
                    </NavLink>
                  ) : person.motherName}
                </td>
              ) : (
                <td>-</td>
              )}

              {person.fatherName ? (
                <td>
                  {father ? (
                    <NavLink to={`${father.slug}`}>
                      {person.fatherName}
                    </NavLink>
                  ) : person.fatherName}
                </td>
              ) : (
                <td>-</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
