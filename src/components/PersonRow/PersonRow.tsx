type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr className="Person">
    <td className="Person__item">{person.name}</td>
    <td className="Person__item">{person.sex}</td>
    <td className="Person__item">{person.born}</td>
    <td className="Person__item">{person.died}</td>
    <td className="Person__item">{person.motherName}</td>
    <td className="Person__item">{person.fatherName}</td>
  </tr>
);
