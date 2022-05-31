import React from 'react';
import './PersonRow.scss';
import { Person } from '../../PersonType';

type Props = {
  person: Person
  line: number,
};

export const PersonRow: React.FC<Props> = ({ person, line }) => {
  return (
    <>
      <td className="PersonRow__cell">{line}</td>
      <td
        className="PersonRow__cell
        PersonRow__cell--text"
      >
        {person.name}
      </td>
      <td
        className="PersonRow__cell
        PersonRow__cell--date"
      >
        {person.sex}
      </td>
      <td
        className="PersonRow__cell
        PersonRow__cell--date"
      >
        {person.born}
      </td>
      <td
        className="PersonRow__cell
        PersonRow__cell--date"
      >
        {person.died}
      </td>
      <td
        className="PersonRow__cell
        PersonRow__cell--text"
      >
        {person.motherName}
      </td>
      <td
        className="PersonRow__cell
        PersonRow__cell--text"
      >
        {person.fatherName}
      </td>
    </>
  );
};
