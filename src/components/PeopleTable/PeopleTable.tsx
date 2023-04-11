import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../../types';

type Props = {
  people: Person[],
  selectedPersonSlug: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
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
        {people.length
          ? (
            people.map(person => {
              const {
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
              } = person;

              const isSelected = slug === selectedPersonSlug;

              let father: Person | undefined;
              let mother: Person | undefined;

              if (fatherName) {
                father = people.find(({ name: personName }) => (
                  personName === fatherName
                ));
              }

              if (motherName) {
                mother = people.find(({ name: personName }) => (
                  personName === motherName
                ));
              }

              return (
                <tr
                  key={slug}
                  data-cy="person"
                  className={classNames(
                    { 'has-background-warning': isSelected },
                  )}
                >
                  <td>
                    <Link
                      to={`../${slug}`}
                      className={classNames(
                        { 'has-text-danger': sex === 'f' },
                      )}
                    >
                      {name}
                    </Link>
                  </td>

                  <td>
                    {sex}
                  </td>

                  <td>
                    {born}
                  </td>

                  <td>
                    {died}
                  </td>

                  <td>
                    {mother
                      ? (
                        <Link
                          to={`../${mother.slug}`}
                          className="has-text-danger"
                        >
                          {motherName}
                        </Link>
                      )
                      : (
                        motherName || '-'
                      )}
                  </td>

                  <td>
                    {father
                      ? (
                        <Link to={`../${father.slug}`}>
                          {fatherName}
                        </Link>
                      )
                      : (
                        fatherName || '-'
                      )}
                  </td>
                </tr>
              );
            })
          )
          : (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
      </tbody>
    </table>
  );
};
