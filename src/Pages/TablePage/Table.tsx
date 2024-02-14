/* eslint-disable no-nested-ternary */
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

function findPerson(people:Person[], fatherName:string) {
  const father = people.find(person => person.name === fatherName);

  return father ? father.slug : 0;
}

export const Table: React.FC<Props> = ({ people }) => {
  const { personName } = useParams();
  const selectedPerson = personName;

  return (
    <>
      {people.length > 0
        ? (
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
              {people.map(person => (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames(
                    // eslint-disable-next-line max-len
                    { 'has-background-warning': selectedPerson === person.slug },
                  )}
                >
                  <td>
                    <Link
                      className={
                        classNames({ 'has-text-danger': person.sex === 'f' })
                      }
                      to={`/people/${person.slug}`}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    { person.motherName
                      ? (findPerson(people, person.motherName) ? (
                        <Link
                          to={`/people/${findPerson(people, person.motherName)}`}
                          className="has-text-danger"
                        >
                          {person.motherName}
                        </Link>
                      )
                        : person.motherName)
                      : '-'}
                  </td>

                  <td>
                    { person.fatherName
                      ? (findPerson(people, person.fatherName) ? (
                        <Link
                          to={`/people/${findPerson(people, person.fatherName)}`}
                        >
                          {person.fatherName || '-'}
                        </Link>
                      )
                        : person.fatherName)
                      : '-'}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        )
        : (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
    </>
  );
};
