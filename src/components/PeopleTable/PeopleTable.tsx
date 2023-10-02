import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string | undefined,
};

const IS_NAME = '-';
const tableHead = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHead.map(currentColumn => (
            <th key={`${currentColumn}_Date.now()`}>{currentColumn}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
          } = person;

          return (
            <tr
              className={classNames({
                'has-background-warning': slug === selectedSlug,
              })}
              data-cy="person"
              key={slug}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td
                className={classNames({
                  'has-text-danger': mother,
                })}
              >
                {mother ? (
                  <PersonLink
                    person={mother}
                  />
                ) : (
                  motherName ?? IS_NAME
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink
                    person={father}
                  />
                ) : (
                  fatherName ?? IS_NAME
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
