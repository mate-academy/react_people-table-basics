import classNames from 'classnames';
import { Person } from '../types';
import { NavLink, useParams } from 'react-router-dom';

type PeopleProps = {
  peoples: Person[];
};

export const PeopleList: React.FC<PeopleProps> = ({ peoples }) => {
  const { personSlug } = useParams();
  const selectedPersone = personSlug;

  const getPersone = (name: string | null, arr: Person[]) => {
    return arr.find(persone => persone.name === name);
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
          {peoples.map(person => {
            const getFather = getPersone(person.fatherName, peoples);
            const getMother = getPersone(person.motherName, peoples);

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': selectedPersone === person.slug,
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
                    {getMother ? (
                      <NavLink
                        className="has-text-danger"
                        to={`${getMother.slug}`}
                      >
                        {person.motherName}
                      </NavLink>
                    ) : (
                      person.motherName
                    )}
                  </td>
                ) : (
                  <td>-</td>
                )}
                {person.fatherName ? (
                  <td>
                    {getFather ? (
                      <NavLink to={`${getFather?.slug}`}>
                        {person.fatherName}
                      </NavLink>
                    ) : (
                      person.fatherName
                    )}
                  </td>
                ) : (
                  <td>-</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
