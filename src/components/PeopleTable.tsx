import { useContext } from 'react';
import { StatesContext } from '../context/Store';
import { PersonLink } from './PersonLink';

export const PeopleTable = () => {
  const { people, isLoading, errorMessage } = useContext(StatesContext);

  const findPersonByName = (name: string) => {
    return people.find(person => person.name === name);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!isLoading && !errorMessage && (
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
      )}
      <tbody>
        {people.map(person => {
          return (
            <PersonLink
              findPersonByName={findPersonByName}
              person={person}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
