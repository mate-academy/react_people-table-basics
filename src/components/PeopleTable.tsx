import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

type PeopleTableProps = {
  peopleList: Person[];
  slug?: string;
  error: boolean;
  alarm: boolean;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  peopleList,
  slug,
  error,
  alarm,
}) => {
  return (
    <>
      {error ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : alarm ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
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
          {peopleList.map(person => (
            <PersonInfo
              key={person.name}
              person={person}
              selected={slug === person.slug}
              mother={peopleList.filter(p => p.name === person.motherName)[0]}
              father={peopleList.filter(p => p.name === person.fatherName)[0]}
            />
          ))}
        </tbody>
        </table>
      )}
    </>
  );
};
