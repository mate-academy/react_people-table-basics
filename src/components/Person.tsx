type Props = {
  person: Person,
};

export const Person: React.FC<Props> = ({ person }) => {
  return (
    <tr key={person.name}>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
};
