import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink';
import { ParentsLink } from '../ParentsLink';

const columnsNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnsNames.map(columnName => (
            <th key={columnName}>
              {columnName}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PeopleLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <ParentsLink parentName={person.motherName} />
            </td>
            <td>
              <ParentsLink parentName={person.fatherName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
