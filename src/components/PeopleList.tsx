import React from 'react';
import { useParams } from 'react-router-dom';
// import { usePeople } from '../store/PeopleContext';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedPerson = slug ? slug : '';

  function getPerson(persons: Person[], personName: string) {
    return persons.find(person => person.name === personName) || null;
  }

  return (
    <>
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
            {people.map((person, index) => (
              <tr
                key={index}
                data-cy="person"
                className={classNames({
                  'has-background-warning': selectedPerson === person.slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    getPerson(people, person.motherName) ? (
                      <PersonLink
                        person={getPerson(people, person.motherName)}
                      />
                    ) : (
                      <span>{person.motherName}</span>
                    )
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    getPerson(people, person.fatherName) ? (
                      <PersonLink
                        person={getPerson(people, person.fatherName)}
                      />
                    ) : (
                      <span>{person.fatherName}</span>
                    )
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </>
  );
};
