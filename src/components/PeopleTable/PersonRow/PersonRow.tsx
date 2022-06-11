import { useEffect, useState } from 'react';
import { getPeople } from '../../../api/getPeople';
import { Persone } from '../../../types/Persone';
import { UpdatedPersone } from '../../../types/UpdatedPersone';

export const PersonRow: React.FC = () => {
  const [people, setPeople] = useState<UpdatedPersone[]>([]);

  useEffect(() => {
    getPeople()
      .then(result => {
        const updatedPeopleList = result.map((
          person: Persone,
          index: number,
        ) => {
          return {
            ...person,
            id: index,
            father: result.find(
              (man: Persone) => person.fatherName === man.name,
            ) || null,
            mother: result.find(
              (woman: Persone) => person.motherName === woman.name,
            ) || null,
          };
        });

        setPeople(updatedPeopleList);
      });
  }, []);

  return (
    <>
      {people.map(person => (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.fatherName ? person.fatherName : 'not found'}
          </td>
          <td>
            {person.motherName ? person.motherName : 'not found'}
          </td>
        </tr>
      ))}
    </>
  );
};
