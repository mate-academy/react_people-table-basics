/*eslint-disable*/
import { FC } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersoneLink } from './PersoneLink';
export interface IPeopleTable {
  people: Person[] | null;
}
export const PeopleTable: FC<IPeopleTable> = ({ people }) => {
  const { slug } = useParams();

  const allPeopleNames = people?.map(persone => persone.name);

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
        {people?.map(person => {
          return (
            <tr
              data-cy="person"
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersoneLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {!allPeopleNames?.includes(person?.motherName!) ? (
                <td>{person.motherName ? person.motherName : '-'}</td>
              ) : (
                <td>
                  {/* For better readabity i separate it another <td> */}

                  <PersoneLink person={person.mother!} />
                </td>
              )}

              {!allPeopleNames?.includes(person?.fatherName!) ? (
                <td>{person.fatherName ? person.fatherName : '-'}</td>
              ) : (
                <td>
                  {/* For better readabity i separate it another <td></td> */}

                  <PersoneLink person={person.father!} />
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
