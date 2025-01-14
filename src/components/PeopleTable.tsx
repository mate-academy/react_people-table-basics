import React, { useEffect, useState } from 'react';
import PersonLink from './PersonLink';
import { useParams } from 'react-router-dom';
import { Person } from '../types';

interface PeopleTableProps {
  people: Person[];
}

const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  useEffect(() => {
    if (slug !== undefined) {
      setSelectedPerson(slug);
    }
  }, [slug]);

  // const handleRowClick = (person:Person) => {
  //   setSelectedPerson(person.slug);
  // };

  const findPersonByName = (name: string): Person | undefined => {
    return people.find(p => p.name === name);
  };

  return people.length === 0 ? (
    <p>There are no people on the server</p>
  ) : (
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
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedPerson === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink
                person={person}
                setSelectedPerson={setSelectedPerson}
              />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName && findPersonByName(person.motherName) ? (
                <PersonLink
                  person={findPersonByName(person.motherName)!}
                  setSelectedPerson={setSelectedPerson}
                />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.fatherName && findPersonByName(person.fatherName) ? (
                <PersonLink
                  person={findPersonByName(person.fatherName)!}
                  setSelectedPerson={setSelectedPerson}
                />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
