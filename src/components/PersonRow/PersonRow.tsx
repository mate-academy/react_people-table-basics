import React from 'react';

import './PersonRow.scss'

type Props = {
  people: People[];
}
export const PersonRow: React.FC<Props> = (props) => {
  const { people } = props;
  return (
    <>
      {people && people.map ((person: People) => person && (
        <tr key={person.name} className="PeopleTable">
            <td className="table-primary">{person.name}</td>
            <td className="table-primary">{person.sex}</td>
            <td className="table-primary">{person.born}</td>
            <td className="table-primary">{person.died}</td>
            <td className="table-primary">{person.fatherName}</td>
            <td className="table-primary">{person.motherName}</td>
        </tr>
      ))}
  </>
  )
};