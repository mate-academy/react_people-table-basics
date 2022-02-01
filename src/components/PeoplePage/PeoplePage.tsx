import { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PersonRow } from '../PersonRow/PersonRow';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      getPeople()
        .then(res => setPeople(res));
      setLoader(false);
    } catch {
      setError(true);
      throw new Error();
    }
  }, []);

  return (
    <div className="people-container">
      <h1>People table</h1>
      {loader && <p>Loading...</p>}
      {error && <p>oops something went wrong...</p>}
      {

        people && (
          <table className="table table-info table-striped">
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
                <PersonRow key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
};
