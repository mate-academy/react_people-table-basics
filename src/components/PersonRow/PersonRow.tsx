type Props = Person;

export const PersonRow: React.FC<Props> = ({
  name,
  sex,
  born,
  died,
  motherName,
  fatherName,
}) => {
  return (
    <tr>
      <th>{name}</th>
      <th>{sex}</th>
      <th>{born}</th>
      <th>{died}</th>
      <th>{motherName || 'Unknown'}</th>
      <th>{fatherName || 'Unknown'}</th>
    </tr>
  );
};
