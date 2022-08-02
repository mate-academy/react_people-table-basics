import PersonRow from '../PersonRow/PersonRow';

type Props = {
  people: People[],
};

const PeopleTable: React.FC<Props> = ({ people }) => (
  <div>
    <table className="table is-hoverable is-bordered table is-fullwidth">
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
        {
          people.map((person) => (
            <tr key={person.slug} className="Person">
              <PersonRow person={person} />
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default PeopleTable;
