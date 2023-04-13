import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedPersonSlug } = useParams();

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
                    <PersonLink person={person} />
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
                        <PersonLink person={mother} />
                      )
                      : (
                        motherName || '-'
                      )}
                  </td>

                  <td>
                    {father
                      ? (
                        <PersonLink person={father} />
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
