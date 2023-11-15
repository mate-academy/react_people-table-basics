import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';

type Props = {
  people: Person[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  function findSemeNameOnColumnName(
    ParentName: string | null,
  ): Person | undefined {
    return people.find((person) => person.name === ParentName);
  }

  const { selectedName } = useParams();

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
        {people?.map((person) => {
          const fatherPerson = findSemeNameOnColumnName(person.fatherName);
          const motherPerson = findSemeNameOnColumnName(person.motherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': selectedName === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
