import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  peoples: Person[],
};

export const PeoplesList: React.FC<Props> = ({ peoples }) => {
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
        <tr data-cy="person">
          <td>
            <a href="#/people/jan-van-brussel-1714">
              Jan van Brussel
            </a>
          </td>

          <td>m</td>
          <td>1714</td>
          <td>1748</td>
          <td>Joanna van Rooten</td>
          <td>Jacobus van Brussel</td>
        </tr>

        <tr data-cy="person">
          <td>
            <a href="#/people/philibert-haverbeke-1907">
              Philibert Haverbeke
            </a>
          </td>

          <td>m</td>
          <td>1907</td>
          <td>1997</td>

          <td>
            <a
              className="has-text-danger"
              href="#/people/emma-de-milliano-1876"
            >
              Emma de Milliano
            </a>
          </td>

          <td>
            <a href="#/people/emile-haverbeke-1877">
              Emile Haverbeke
            </a>
          </td>
        </tr>

        <tr data-cy="person" className="has-background-warning">
          <td>
            <a href="#/people/jan-frans-van-brussel-1761">
              Jan Frans van Brussel
            </a>
          </td>

          <td>m</td>
          <td>1761</td>
          <td>1833</td>
          <td>-</td>

          <td>
            <a href="#/people/jacobus-bernardus-van-brussel-1736">
              Jacobus Bernardus van Brussel
            </a>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <a
              className="has-text-danger"
              href="#/people/lievijne-jans-1542"
            >
              Lievijne Jans
            </a>
          </td>

          <td>f</td>
          <td>1542</td>
          <td>1582</td>
          <td>-</td>
          <td>-</td>
        </tr>

        <tr data-cy="person">
          <td>
            <a href="#/people/bernardus-de-causmaecker-1721">
              Bernardus de Causmaecker
            </a>
          </td>

          <td>m</td>
          <td>1721</td>
          <td>1789</td>

          <td>
            <a
              className="has-text-danger"
              href="#/people/livina-haverbeke-1692"
            >
              Livina Haverbeke
            </a>
          </td>

          <td>
            <a href="#/people/lieven-de-causmaecker-1696">
              Lieven de Causmaecker
            </a>
          </td>
        </tr>
        {peoples.map(person => (
          <tr data-cy="person">
            <td>
              <NavLink to={person.slug}>
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {person.motherName ? (
              <td>
                <NavLink
                  className="has-text-danger"
                  to={`${person.mother?.slug}`}
                >
                  {person.motherName}
                </NavLink>
              </td>
            ) : (
              <td>-</td>
            )}

            {person.fatherName ? (
              <td>
                <NavLink to={`${person.father?.slug}`}>
                  {person.fatherName}
                </NavLink>
              </td>
            ) : (
              <td>-</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
