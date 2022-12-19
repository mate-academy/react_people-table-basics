import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { useMatch } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findPerson = useCallback((personName: string) => {
    return people.find(person => person.name === personName);
  }, [people]);

  const persons = useMemo(() => {
    return people.map(person => {
      const father = person.fatherName
        ? findPerson(person.fatherName)
        : undefined;

      const mother = person.motherName
        ? findPerson(person.motherName)
        : undefined;

      return {
        ...person,
        father,
        mother,
      };
    });
  }, [people]);

  const selectedPerson = useMatch('/people/:slug')?.params.slug;

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
        {persons.map((person) => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': selectedPerson === person.slug,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                (person.mother
                  ? (
                    <PersonLink
                      person={person.mother}
                    />
                  )
                  : person.motherName || '-'
                )
              }
            </td>

            <td>
              {
                (person.father
                  ? (
                    <PersonLink
                      person={person.father}
                    />
                  )
                  : person.fatherName || '-'
                )
              }
            </td>
          </tr>
        ))}

        {false && (
          <>
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
          </>
        )}
      </tbody>
    </table>
  );
};
