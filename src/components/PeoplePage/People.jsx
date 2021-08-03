import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../Person/Person';
import { personType } from '../../types/peopleTypes';

function People({ people }) {
  const tableHead = [`name`, `sex`, `born`, `died`, `mother`, `father`];

  return (
    <>
      <h1
        className="people__title"
      >
        People info
      </h1>
      {people
        ? <table className="table">
          <thead>
            <tr className="table__head-row">
              {tableHead.map(word => (
                <td className="table__cell" key={word}>
                  {word}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <PersonRow
                key={person.slug}
                person={person}
              />
            ))}
          </tbody>
        </table>
        : <p>Somothing went wrong...</p>}
    </>

  );
}

People.propTypes = PropTypes.arrayOf(personType).isRequired;

export const PeoplePage = React.memo(People);
