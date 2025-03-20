import React from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';


type Props = {
  users: Person[];
};

export const PeopleTable: React.FC<Props> = ({ users }) => {
  const { slug } = useParams();

  const findPersonByName = (name: string | null): Person | null => {
    if (!name) return null;
    return users.find(user => user.name === name) || null;
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
        {users.map(person => {
          const motherPerson = findPersonByName(person.motherName);
          const fatherPerson = findPersonByName(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink
                  person={motherPerson}
                  name={person.motherName || '-'}
                />
              </td>
              <td>
                <PersonLink
                  person={fatherPerson}
                  name={person.fatherName || '-'}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
