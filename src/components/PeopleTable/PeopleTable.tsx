import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug = '' } = useParams();

  const checkNameInPeople = useCallback((parentName: string | null) => {
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
            sex, born, died, fatherName, motherName, slug,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': personSlug === person.slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{checkNameInPeople(motherName)}</td>
              <td>{checkNameInPeople(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
