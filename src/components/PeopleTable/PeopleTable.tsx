/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

const getPersonString = (name: string, born: number) => {
  return `${name.toLocaleLowerCase().replaceAll(' ', '-')}-${born}`;
};

interface Props {
  people: Person[]
  personName: string | undefined
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { people, personName } = props;

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
        {people.map(person => (
          <PersonLink
            person={person}
            className={classNames({ 'has-background-warning': personName === getPersonString(person.name, person.born) })}
            motherBirth={people.find(mother => mother.name === person.motherName)?.born || null}
            fatherBirth={people.find(father => father.name === person.fatherName)?.born || null}
          />
        ))}
      </tbody>
    </table>
  );
};
