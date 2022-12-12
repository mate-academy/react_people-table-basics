import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[] | undefined
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const checkPerson = useCallback((parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const foundPerson = people?.find(parent => parent.name === parentName);

    return foundPerson ? <PersonLink person={foundPerson} /> : parentName;
  }, [people]);

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
        {people?.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames(
              { 'has-background-warning': slug === person.slug },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{checkPerson(person.motherName)}</td>
            <td>{checkPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
