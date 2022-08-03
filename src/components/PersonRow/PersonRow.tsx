import Person from '../../types/Person';

interface Props {
  person: Person,
}

const PersonRow:React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person">
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
};

export default PersonRow;
