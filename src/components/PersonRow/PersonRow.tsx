type Props = {
  person: People;
};

const PersonRow: React.FC<Props> = ({ person }) => (
  <tr className="Person">
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || 'None'}</td>
    <td>{person.fatherName || 'None'}</td>
  </tr>
);

export default PersonRow;
