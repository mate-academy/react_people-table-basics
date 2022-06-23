import { NewPerson } from '../../../../react-app-env';

interface Props {
  person: NewPerson,
}

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>
      {person.mother !== null ? (
        <ul style={{ listStyleType: 'none' }}>
          <li>{person.mother.name}</li>
          <li>{`Born: ${person.mother.born}`}</li>
          <li>{`Died: ${person.mother.died}`}</li>
        </ul>
      ) : (
        'Mother not found'
      )}
    </td>
    <td>
      {person.father !== null ? (
        <ul style={{ listStyleType: 'none' }}>
          <li>{person.father.name}</li>
          <li>{`Born: ${person.father.born}`}</li>
          <li>{`Died: ${person.father.died}`}</li>
        </ul>
      ) : (
        'Father not found'
      )}
    </td>
  </tr>
);
