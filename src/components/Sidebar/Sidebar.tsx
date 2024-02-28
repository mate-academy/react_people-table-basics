import React from 'react';

interface Props {
  selectedPerson: Person;
  selectPerson: (person: Person) => void;
  people: Person[];
}

export const Sidebar: React.FC<Props> = (props) => {
  const { selectedPerson, selectPerson, people } = props;

  return (
    <div>
      <h2 className="subtitle">Selected Person:</h2>
      <ul>
        <li>Name: {selectedPerson.name}</li>
        <li>Sex: {selectedPerson.sex}</li>
        <li>Born year: {selectedPerson.born}</li>
        <li>Died year: {selectedPerson.died}</li>
        <li>
          {selectedPerson.motherName
            ? people.some(woman => woman.name === selectedPerson.motherName)
              ? <>
                  <button
                    className="button is-ghost p-0"
                    type="button"
                    onClick={() => selectPerson(selectedPerson.mother as Person)}
                  >
                    {`Mother: ${selectedPerson.motherName}`}
                  </button>
                </>
              : <p>{`Mother: ${selectedPerson.motherName}`}</p>
            : <p>Unknown</p>}
        </li>
        <li>
          {selectedPerson.fatherName
            ? people.some(man => man.name === selectedPerson.fatherName)
              ? <>
                  <button
                    className="button is-ghost p-0"
                    type="button"
                    onClick={() => selectPerson(selectedPerson.father as Person)}
                  >
                    {`Father: ${selectedPerson.fatherName}`}
                  </button>
                </>
              : <p>{`Father: ${selectedPerson.fatherName}`}</p>
            : <p>Unknown</p>}
        </li>
      </ul>
    </div>
  );
};
