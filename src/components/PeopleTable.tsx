/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
// components/PeopleTable.tsx
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader';

interface Props {
  people: Person[];
  isLoading: boolean;
  error: string | null;
}

export const PeopleTable: React.FC<Props> = ({ people, isLoading, error }) => {
  const { slug } = useParams();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }
  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }
  const getPersonLink = (name: string | null) => {
    if (!name) {
      return '-';
    };
    const foundPerson = people.find(p => p.name === name);
    return foundPerson ? <PersonLink person={foundPerson} /> : name;
  };

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
          <tr
            key={person.slug}
            data-cy="person"
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getPersonLink(person.motherName)}</td>
            <td>{getPersonLink(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
