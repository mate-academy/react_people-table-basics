import { FullPerson } from '../../types/Person';

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    born,
    died,
    motherName,
    fatherName,
    sex,
  } = person;

  return (
    <tr className="Person">
      <th>{name}</th>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName || '-------'}</td>
      <td>
        {fatherName}
        {' '}
        || '
      </td>
    </tr>
  );
};

interface Props {
  person: FullPerson
}
