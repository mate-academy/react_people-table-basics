type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table">
    <thead>
      <tr className="">
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map((person) => {
        return (
          <tr>
            <th>{person.name}</th>
            <th>{person.sex}</th>
            <th>{person.born}</th>
            <th>{person.died}</th>
            <th>{person.motherName || 'Unknown'}</th>
            <th>{person.fatherName || 'Unknown'}</th>
          </tr>
        );
      })}
    </tbody>
  </table>
);
