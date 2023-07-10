import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  persons: null | Person[],
};

export const PersonList: FC<Props> = ({ persons }) => {
  const { slug } = useParams();

  if (!persons || !persons.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

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
        {persons.map(person => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const findPerson = (personName: string) => {
            const foundPerson = persons.find(pers => pers.name === personName);

            if (foundPerson) {
              return (
                <a
                  className={classNames({
                    'has-text-danger': foundPerson.sex === 'f',
                  })}
                  href={`#/people/${foundPerson.slug}`}
                >
                  {foundPerson.name}
                </a>
              );
            }

            return personName;
          };

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <a
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                  href={`#/people/${person.slug}`}
                >
                  {name}
                </a>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findPerson(motherName || '-')}</td>
              <td>{findPerson(fatherName || '-')}</td>
            </tr>
          );
        })}

        {/* <tr data-cy="person">
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
        </tr> */}
      </tbody>
    </table>
  );
};
