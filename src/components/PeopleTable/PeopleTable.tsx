import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
          const mother = people
            .find(currPerson => currPerson.name === person.motherName);
          const father = people
            .find(currPerson => currPerson.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                { 'has-background-warning': person.slug === slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {mother
                ? <td><PersonLink person={mother} /></td>
                : <td>{person.motherName ? person.motherName : '-'}</td>}
              {father
                ? <td><PersonLink person={father} /></td>
                : <td>{person.fatherName ? person.fatherName : '-'}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
