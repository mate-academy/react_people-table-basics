import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { columnNames } from '../../utils/constants';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { chosenUserSlug = '' } = useParams();

  return (
    <>
      {!people.length
        ? (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        ) : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {columnNames.map(name => (
                  <th>{name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PersonItem
                  person={person}
                  chosenUserSlug={chosenUserSlug}
                  key={person.slug}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
