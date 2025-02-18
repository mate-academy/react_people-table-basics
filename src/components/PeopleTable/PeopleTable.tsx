import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { TableColumnsNames } from '../../types/TableColumnsNames';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const columns = Object.values(TableColumnsNames);

  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const { sex, born, died, motherName, fatherName } = person;

          const foundMother = people.find(mother => mother.name === motherName);
          const foundFather = people.find(father => father.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': slug === person.slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {foundMother ? (
                  <PersonLink person={foundMother} />
                ) : (
                  <p>{motherName ? motherName : '-'}</p>
                )}
              </td>
              <td>
                {foundFather ? (
                  <PersonLink person={foundFather} />
                ) : (
                  <p>{fatherName ? fatherName : '-'}</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
