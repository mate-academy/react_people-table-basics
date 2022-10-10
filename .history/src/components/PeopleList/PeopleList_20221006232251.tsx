import { FC, useEffect, useState } from 'react';
import PeopleItem from '../PeopleItem';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';

interface Props {
  setOnLoad: (state: boolean) => void;
  setServerError: (state: boolean) => void;
  setIsEmpty: (state: boolean) => void;
}

export const PeopleList: FC<Props> = ({
  setOnLoad,
  setServerError,
  setIsEmpty,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState('');

  const findParrent = (parentName: string) => {
    return (people.find(person => person.name === parentName))?.slug;
  };

  useEffect(() => {
    setOnLoad(true);

    getPeople()
      .then(value => setPeople(value))
      .catch(() => setServerError(true))
      .finally(() => setOnLoad(false));

      people.length && setIsEmpty(true);
  }, []);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
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
          <PeopleItem
            key={person.slug}
            person={person}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
            findParrent={findParrent}
          />
        ))}
      </tbody>
    </table>
  );
};
