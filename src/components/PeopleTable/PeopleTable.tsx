import { useParams } from 'react-router-dom';
import { usePeople } from '../../context/PeopleContext';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

export const PeopleTable = () => {
  const { people, loading, error } = usePeople();
  const { slug } = useParams<{ slug?: string }>();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const findPersonByName = (name: string | null): Person | undefined => {
    if (!name) {
      return undefined;
    }

    return people.find(person => person.name === name);
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

            <td>
              <PersonLink
                person={findPersonByName(person.motherName)}
                name={person.motherName}
              />
            </td>

            <td>
              <PersonLink
                person={findPersonByName(person.fatherName)}
                name={person.fatherName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
