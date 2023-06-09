import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person[]
};

export const PeopleTable: React.FC<Props> = ({ person }) => {
  const { slug: selectedSlug } = useParams();

  function findParent(people: Person[], parentName: string | null) {
    const parent = people.find(item => item.name === parentName);

    if (parent) {
      return (
        <Link
          to={`../${parent.slug}`}
          className={classNames({ 'has-text-danger': parent.sex === 'f' })}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
  }

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
          {person.map((elem) => (
            <tr
              data-cy="person"
              className={classNames(
                { 'has-background-warning': elem.slug === selectedSlug },
              )}
            >

              <td key={elem.slug}>
                <Link
                  to={`/people/${elem.slug}`}
                  className={
                    classNames({ 'has-text-danger': elem.sex === 'f' })
                  }
                >
                  {elem.name}
                </Link>
              </td>

              <td>{elem.sex}</td>
              <td>{elem.born}</td>
              <td>{elem.died}</td>

              <td>{findParent(person, elem.motherName)}</td>
              <td>{findParent(person, elem.fatherName)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
