import React from 'react';

import classNames from 'classnames';

import { Person } from '../../types';

import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[] | null
  selectedPersonSlug: string
  error: string
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  error,
}) => {
  const isActive = (person: Person) => person.slug === selectedPersonSlug;

  return (
    <>
      {error}
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >

        {people?.length && (
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
        )}

        <tbody>
          {people?.map(person => {
            const {
              born,
              died,
              fatherName,
              motherName,
              name,
              sex,
              slug,
            } = person;

            return (
              <tr
                data-cy="person"
                key={slug}
                className={classNames({
                  'has-background-warning': isActive(person),
                })}
              >
                <td>
                  <PersonLink name={name} sex={sex} slug={slug} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {person.mother ? (
                    <PersonLink
                      name={person.mother.name}
                      sex={person.mother.sex}
                      slug={person.mother.slug}
                    />
                  ) : motherName || '-'}
                </td>
                <td>
                  {person.father ? (
                    <PersonLink
                      name={person.father.name}
                      sex={person.father.sex}
                      slug={person.father.slug}
                    />
                  ) : fatherName || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
