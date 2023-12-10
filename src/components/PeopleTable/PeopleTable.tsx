/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugId } = useParams();
  const selectedPerson = people.find(person => person.slug === slugId);

  const getPerson = (name: string | null) => {
    return people.find(person => person.name === name);
  };

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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
          } = person;

          const mother = getPerson(motherName);
          const father = getPerson(fatherName);

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson === person,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {(mother
                  ? <PersonLink person={mother} />
                  : motherName)
                || '-'}
              </td>
              <td>
                {(father
                  ? <PersonLink person={father} />
                  : fatherName)
                || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
