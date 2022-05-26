import { PersonRow } from './PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
      {(people.length > 0) ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother name</th>
                <th>Father name</th>
              </tr>
            </thead>
            <tbody>
              {people.map(person => (
                <tr key={person.slug}>
                  <PersonRow person={person} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
