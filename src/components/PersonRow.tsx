import React from 'react';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = (props) => {
  const { person } = props;

  return (
    <tr key={person.slug}>
      <td className="PeopleTable__property">
        {person.name}
      </td>
      <td className="PeopleTable__property">
        {person.sex}
      </td>
      <td className="PeopleTable__property">
        {person.born}
      </td>
      <td className="PeopleTable__property">
        {person.died}
      </td>
      <td className="PeopleTable__property">
        {person.motherName}
      </td>
      <td className="PeopleTable__property">
        {person.fatherName}
      </td>
    </tr>
  );
};
