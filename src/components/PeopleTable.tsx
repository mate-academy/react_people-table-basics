import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  peopleList: Person[],
  selectedPerson: string | null,
  isNoPeople: boolean,
};

export const PeopleTable: React.FC<Props> = ({
  peopleList,
  selectedPerson,
  isNoPeople,
}) => {
  const isSelected = (person: Person) => person.slug === selectedPerson;

  const getSlug = (name: string | null) => {
    const findPerson = peopleList.find(person => person.name === name);

    return findPerson?.slug;
  };

  return (
    <>
      {peopleList.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table
            is-striped
            is-hoverable
            is-narrow
            is-fullwidth
          "
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
            {peopleList.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': isSelected(person),
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
                  {!person.motherName && <p>-</p>}

                  {getSlug(person.motherName) ? (
                    <Link
                      to={`/people/${getSlug(person.motherName)}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    <p>{person.motherName}</p>
                  )}
                </td>

                <td>
                  {!person.fatherName && <p>-</p>}

                  {getSlug(person.fatherName) ? (
                    <Link to={`/people/${getSlug(person.fatherName)}`}>
                      {person.fatherName}
                    </Link>
                  ) : (
                    <p>{person.fatherName}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isNoPeople && !peopleList.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
};
