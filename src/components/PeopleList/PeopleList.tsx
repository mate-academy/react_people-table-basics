import { useContext } from 'react';
import { Person } from '../../types';
import { PeopleListItem } from '../PeopleListItem';
import { PeopleContext } from '../../contexts/PeopleContext';
import { Loader } from '../Loader';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { isPeopleLoading } = useContext(PeopleContext);

  if (isPeopleLoading) {
    return (
      <Loader />
    );
  }

  return (
    people.length ? (
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
            <PeopleListItem
              people={people}
              person={person}
              key={person.slug}
            />
          ))}
        </tbody>
      </table>
    ) : (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    )
  );
};
