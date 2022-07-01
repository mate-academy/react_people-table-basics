import { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { Person, PreperedPerson } from '../../react-app-env';
import { PeopleTable } from '../peopleTable/peopleTable';

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

  useEffect(() => {
    getPeople().then((array) => setAllPeaple(replaceParent(array)));
  }, []);

  useEffect(() => {
    setFilteredPeaple(allPeople);
  }, [allPeople]);

  return (
    <>
      {filteredPeople.length === 0
        ? (
          <p>Please wait the list is loading...</p>
        ) : (
          <PeopleTable filteredPeople={filteredPeople} />
        )}
    </>
  );
};
