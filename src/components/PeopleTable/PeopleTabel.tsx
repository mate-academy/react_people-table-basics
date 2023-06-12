import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person[] | undefined,
  slugPerson: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({ people, slugPerson }) => {
  return (
    <>
      {people && people.length > 0 && (
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
              const {
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
              } = person;
              const mother = people.find(
                (child) => (child.motherName === person.name),
              ) || { slug: '' };
              const father = people.find(
                (child) => (child.fatherName === person.name),
              ) || { slug: '' };

              return (
                <tr
                  data-cy="person"
                  className={
                    classNames(
                      { 'has-background-warning': person.slug === slugPerson },
                    )
                  }
                >
                  <td>
                    <Link
                      to={`/people/${slug}`}
                      className={classNames(
                        { 'has-text-danger': sex === 'f' },
                      )}
                    >
                      {name}
                    </Link>
                  </td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother.slug !== '' && (
                      <Link
                        to={`/people/${mother?.slug}`}
                        className="has-text-danger"
                      >
                        {motherName}
                      </Link>
                    )}
                    {mother.slug === '' && (
                      <p>{motherName || '-'}</p>
                    )}
                  </td>
                  <td>
                    {father.slug !== '' && (
                      <Link
                        to={`/people/${father?.slug}`}
                      >
                        {fatherName}
                      </Link>
                    )}
                    {father.slug === '' && (
                      <p>{fatherName || '-'}</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
