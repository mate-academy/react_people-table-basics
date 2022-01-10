import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PersonRow } from '../PersonRow';

type ProcessPeople = (people: Person[]) => ProcessedPerson[];

const processPeople: ProcessPeople = (people) => {
  return people.map(person => {
    const mother = people.find(woman => woman.name === person.motherName);
    const father = people.find(man => man.name === person.motherName);

    return {
      ...person,
      mother: mother || null,
      father: father || null,
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<ProcessedPerson[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPeople = async () => {
    const peopleFromServer: Person[] = await getPeople();

    setPeople(processPeople(peopleFromServer));
    setLoading(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People</h1>
      {loading
        ? (<h2 className="subtitle">Loading people...</h2>)
        : (
          <table className="table is-striped is-hoverable">
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
                <PersonRow key={person.name} {...person} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
