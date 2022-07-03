type Props = {
  people: People[]
};

export const PersonRow: React.FC<Props> = ({ people }) => (
  <>
    {people.map(person => (
      <tr key={person.slug}>
        <td>{person.name}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.mother?.name || '-'}</td>
        <td>{person.father?.name || '-'}</td>
      </tr>
    ))}
  </>
);
