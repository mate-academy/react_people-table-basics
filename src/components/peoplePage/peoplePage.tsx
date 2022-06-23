import { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { Person, PreperedPerson } from '../../react-app-env';
import { PeopleTable } from '../peopleTable/peopleTable';

// ---Please, don't ask me delete coments in this project,
// cose I have misunderstood the task and wrote alot of lines of code =_= ---
// type Parent = 'fatherName' | 'motherName';
// interface ParentName {
//   name: string,
//   id: string,
// }

// const findParent = (peopleArr: PreperedPerson[], parent: Parent) => {
//   const parents: (ParentName)[] = peopleArr.map((person, index) => {
//     const adult: Person | null = person[parent];

//     if (adult === null) {
//       return {
//         name: 'x',
//         id: `notTheIndex${index + 2}`,
//       };
//     }

//     return {
//       name: adult.name,
//       id: adult.slug,
//     };
//   });

//   return parents
//     .filter(el => el.name !== 'x')
//     .sort((a, b) => (
//       (a.name).localeCompare(b.name)
//     )).filter((person, i, arr) => {
//       if (i === arr.length - 1) {
//         return 1;
//       }

//       const next = arr[i + 1];

//       // eslint-disable-next-line max-len
//       return person.name !== next.name;
//     });
// };

const replaceParent = (array: Person[]) => {
  return array.map((person: Person, _index, arr) => (
    {
      ...person,
      fatherName: arr.find(man => man.name === person.fatherName) || null,
      motherName: arr.find(woman => woman.name === person.motherName) || null,
    }
  ));
};

export const PeoplePage = () => {
  const [allPeople, setAllPeaple] = useState<PreperedPerson[]>([]);
  // eslint-disable-next-line max-len
  const [filteredPeople, setFilteredPeaple] = useState<PreperedPerson[]>(allPeople);
  // const [mothers, setMothers] = useState<(ParentName)[]>([]);
  // const [fathers, setFathers] = useState<(ParentName)[]>([]);
  // const [selectedMother, setSelectedMother] = useState('Chose the name of mother');
  // const [selectedFather, setSelectedFather] = useState('Chose the name of father');

  useEffect(() => {
    getPeople().then((array) => setAllPeaple(replaceParent(array)));
  }, []);

  useEffect(() => {
    setFilteredPeaple(allPeople);
    // setMothers(findParent(allPeople, 'motherName'));
    // setFathers(findParent(allPeople, 'fatherName'));
  }, [allPeople]);

  // useEffect(() => {
  //   setFilteredPeaple(() => (
  //     allPeople.filter(person => (selectedMother === 'All'
  //       ? true
  //       : person.motherName?.name === selectedMother
  //     ))
  //   ));
  // }, [selectedMother]);

  // useEffect(() => {
  //   setFilteredPeaple(() => (
  //     allPeople.filter(person => (
  //       // eslint-disable-next-line max-len
  //       (selectedFather === 'All' || selectedFather === 'Chose the name of mother')
  //         ? true
  //         : person.fatherName?.name === selectedFather
  //     ))
  //   ));
  // }, [selectedFather]);

  return (
    <>
      {/* <select
        name="byMother"
        value={selectedMother}
        onChange={(event) => {
          setSelectedMother(event.target.value);
        }}
      >
        <option
          value="Chose the name of mother"
          disabled
        >
          Chose the name of mother
        </option>
        <option value="All">All</option>

        {mothers.map(person => (
          <option value={person?.name} key={person?.id}>{person?.name}</option>
        ))}
      </select>

      <select
        name="byFather"
        value={selectedFather}
        onChange={(event) => {
          setSelectedFather(event.target.value);
        }}
      >
        <option
          value="Chose the name of father"
          disabled
        >
          Chose the name of father
        </option>
        <option value="All">All</option>

        {fathers.map(person => (
          <option value={person?.name} key={person?.id}>{person?.name}</option>
        ))}
      </select> */}

      {filteredPeople.length === 0
        ? (
          <p>Please wait the list is loading...</p>
        ) : (
          <PeopleTable filteredPeople={filteredPeople} />
        )}
    </>
  );
};
