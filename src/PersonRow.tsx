type Props = {
  title: string;
};

export const PersonRow: React.FC <Props> = ({ title }) => {
  return (
    <td className="table__column-title">
      {title}
    </td>
  );
};
