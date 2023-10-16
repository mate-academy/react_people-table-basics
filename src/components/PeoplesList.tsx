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
          const {
            name,
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const mother = getParent(motherName, peoples);
          const father = getParent(fatherName, peoples);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': selectedPersonSlug === slug,
              })}
            >
              <td>
                <NavLink
                  to={slug}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </NavLink>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {motherName ? (
                <td>
                  {mother ? (
                    <NavLink
                      className="has-text-danger"
                      to={`${mother.slug}`}
                    >
                      {motherName}
                    </NavLink>
                  ) : motherName}
                </td>
              ) : (
                <td>-</td>
              )}

              {fatherName ? (
                <td>
                  {father ? (
                    <NavLink to={`${father.slug}`}>
                      {fatherName}
                    </NavLink>
                  ) : fatherName}
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
