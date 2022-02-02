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
    <tr className="Person">
      <td className="Person_Row-data">{name}</td>
      <td className="Person_Row-data">{sex}</td>
      <td className="Person_Row-data">{born}</td>
      <td className="Person_Row-data">{died}</td>
      <td className="Person_Row-data">{motherName || 'Uknown'}</td>
      <td className="Person_Row-data">{fatherName || 'Uknown'}</td>
    </tr>
  );
};
