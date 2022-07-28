import './PersonRow.scss';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.fatherName || 'No info'}</td>
    <td>{person.motherName || 'No info'}</td>
  </tr>
);
