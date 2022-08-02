type Props = {
  person: Person,
};

export const PersonRow:React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <tr className="person" key={person.slug}>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
};
