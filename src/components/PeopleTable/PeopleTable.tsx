import React from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const getClassNameChosePerson = (slug: string) => {
    return slug === personSlug ? 'has-background-warning' : '';
  };

  const getPerson = (personName: string) => {
    const person = people.find(({ name }) => name === personName);

    return person ? <PersonLink person={person} /> : personName;
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
          const { name, sex, born, died, motherName, fatherName, slug } =
            person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={getClassNameChosePerson(slug)}
            >
              <td>{getPerson(name)}</td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherName ? getPerson(motherName) : '-'}</td>
              <td>{fatherName ? getPerson(fatherName) : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
