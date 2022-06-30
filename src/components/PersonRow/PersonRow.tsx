type Props = {
  person: PersonWithParents
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || '---'}</td>
    <td>{person.fatherName || '---'}</td>
  </>
);
