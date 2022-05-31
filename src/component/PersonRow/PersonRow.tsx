type Props = {
  person: People
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person">
      <td>
        {person.name}
      </td>
      <td>
        {person.sex}
      </td>
      <td>
        {person.born}
      </td>
      <td>
        {person.died}
      </td>
      <td>
        {person.motherName === null ? '-' : person.motherName}
      </td>
      <td>
        {person.fatherName === null ? '-' : person.fatherName}
      </td>
    </tr>
  );
};
