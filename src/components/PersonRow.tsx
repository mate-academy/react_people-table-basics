import { PreparedPerson } from '../Types/PreparedPerson';

type Props = {
  person: PreparedPerson
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <tr>
      <td className="has-text-left is-vcentered">{name}</td>
      <td className="has-text-left is-vcentered">{sex}</td>
      <td className="has-text-left is-vcentered">{born}</td>
      <td className="has-text-left is-vcentered">{died}</td>
      <td className="has-text-left is-vcentered">{motherName}</td>
      <td className="has-text-left is-vcentered">{fatherName}</td>
    </tr>
  );
};
