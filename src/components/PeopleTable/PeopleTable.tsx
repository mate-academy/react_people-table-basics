import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugParam } = useParams();

  const checkPerson = useCallback((parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const foundPerson = people.find(parent => parent.name === parentName);

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
        {people.map(person => {
          const {
            slug, sex, born, died, motherName, fatherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': slugParam === slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{checkPerson(motherName)}</td>
              <td>{checkPerson(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
