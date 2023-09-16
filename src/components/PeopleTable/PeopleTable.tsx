import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { columnNames } from '../../helpers/helpers';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people : Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">

        {people.length === 0
          ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )
          : (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columnNames.map(name => (
                    <th key={name}>{name}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <PersonItem
                    key={person.slug}
                    person={person}
                    isSelected={slug}
                  />
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
