import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from '../components/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedUserSlug = slug;
  const searchPeopleByName = (name: string | null) => {
    return people?.find(
      person => person.name.toLowerCase() === name?.toLowerCase(),
    );
  };

  return (
    <>
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
            return (
              <tr
                data-cy="person"
                key={person.name + person.born}
                className={cn(
                  selectedUserSlug === person.slug && 'has-background-warning',
                )}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {searchPeopleByName(person.motherName) ? (
                    <PersonLink
                      person={searchPeopleByName(person.motherName)}
                    />
                  ) : (
                    <span>
                      {person.motherName ? `${person.motherName}` : '-'}
                    </span>
                  )}
                </td>
                <td>
                  {searchPeopleByName(person.fatherName) ? (
                    <PersonLink
                      person={searchPeopleByName(person.fatherName)}
                    />
                  ) : (
                    <span>
                      {person.fatherName ? `${person.fatherName}` : '-'}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
