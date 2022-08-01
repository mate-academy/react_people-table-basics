type Props = {
  person: Person;
};

export const PeopleRow: React.FC<Props> = ({ person }) => (
  <tr>
    <td className="is-vcentered">{person.name}</td>
    <td className="is-vcentered">{person.sex}</td>
    <td className="is-vcentered">{person.born}</td>
    <td className="is-vcentered">{person.died}</td>
    <td className="is-vcentered">{person.motherName}</td>
    <td className="is-vcentered">{person.fatherName}</td>
  </tr>
);
