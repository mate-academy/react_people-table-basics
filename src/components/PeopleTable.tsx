import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';

type Props = {
  people: Person[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  function findPerson(
    parentName: string | null,
  ): Person | undefined {
    return people.find((person) => person.name === parentName);
  }

  const { selectedName } = useParams();
  const tableColumns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumns.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people?.map((person) => {
          const fatherPerson = findPerson(person.fatherName);
          const motherPerson = findPerson(person.motherName);

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
