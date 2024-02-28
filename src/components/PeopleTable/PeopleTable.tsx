import React from 'react';

interface Props {
  people: Person[];
  selectPerson: (person: Person) => void;
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { people, selectPerson } = props;

  const tableHead: string[] = Object.keys(people[0])
    .filter(key => key !== 'fatherName'
      && key !== 'motherName'
      && key !== 'slug');

  return (
    <table className="table is-striped is-bordered mb-6 myTable">
      <thead>
        <tr>
          {tableHead.map(item => (
            <th key={item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.name}>
            <td>
              <button
                className="button is-ghost p-0"
                type="button"
                onClick={() => selectPerson(person)}
              >
                {person.name}
              </button>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                ? people.some(woman => woman.name === person.motherName)
                  ? <>
                      <button
                        className="button is-ghost p-0"
                        type="button"
                        onClick={() => selectPerson(person.mother as Person)}
                      >
                        {person.motherName}
                      </button>
                    </>
                  : <p>{person.motherName}</p>
                : <p>Unknown</p>}
            </td>
            <td>
              {person.fatherName
                ? people.some(man => man.name === person.fatherName)
                  ? <>
                      <button
                        className="button is-ghost p-0"
                        type="button"
                        onClick={() => selectPerson(person.father as Person)}
                      >
                        {person.fatherName}
                      </button>
                    </>
                  : <p>{person.fatherName}</p>
                : <p>Unknown</p>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
