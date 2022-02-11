type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div className="people-page__table">
      <table className="table is-striped is-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.slug}>
              <td>{person.name}</td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.motherName || 'none'}</td>
              <td>{person.fatherName || 'none'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
