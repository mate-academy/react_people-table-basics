import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  // console.log(personSlug);

  const selectedPerson = people.find(x => x.slug === slug);

  const personFather = people.find(x => x.name === person.fatherName);
  const personMother = people.find(x => x.name === person.motherName);

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': selectedPerson?.name === person.name,
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
          {person.motherName !== null ? (
            personMother !== undefined ? (
              <Link
                to={`/people/${personMother.slug}`}
                className={classNames({
                  'has-text-danger': personMother.sex === 'f',
                })}
              >
                {personMother.name}
              </Link>
            ) : (
              person.motherName
            )
          ) : (
            '-'
          )}
        </td>
        <td>
          {person.fatherName !== null ? (
            personFather !== undefined ? (
              <Link
                to={`/people/${personFather.slug}`}
                className={classNames({
                  'has-text-danger': personFather.sex === 'f',
                })}
              >
                {personFather.name}
              </Link>
            ) : (
              person.fatherName
            )
          ) : (
            '-'
          )}
        </td>
      </tr>

      {/* <tr data-cy="person">
        <td>
          <a href="#/people/philibert-haverbeke-1907">Philibert Haverbeke</a>
        </td>

        <td>m</td>
        <td>1907</td>
        <td>1997</td>

        <td>
          <a className="has-text-danger" href="#/people/emma-de-milliano-1876">
            Emma de Milliano
          </a>
        </td>

        <td>
          <a href="#/people/emile-haverbeke-1877">Emile Haverbeke</a>
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
          <a className="has-text-danger" href="#/people/lievijne-jans-1542">
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
          <a className="has-text-danger" href="#/people/livina-haverbeke-1692">
            Livina Haverbeke
          </a>
        </td>

        <td>
          <a href="#/people/lieven-de-causmaecker-1696">
            Lieven de Causmaecker
          </a>
        </td>
      </tr> */}
    </>
  );
};
