import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../types';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
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
          {people.map((person) => {
            const isSelected = slug === person.slug;
            const findMother = (): Person | undefined => {
              return people.find((mother) => mother.name === person.motherName);
            };

            const findFather = (): Person | undefined => {
              return people.find((father) => father.name === person.fatherName);
            };

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({ 'has-background-warning': isSelected })}
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
                <td>{findMother() ? person.motherName : '-'}</td>
                <td>{findFather() ? person.fatherName : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
