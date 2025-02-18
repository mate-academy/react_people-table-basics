import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';

type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  slug: string;
};

type PeopleListProps = {
  people: Person[];
  isLoading: boolean;
  highlightedPersonSlug?: string;
};

export const PeopleList = ({
  people,
  isLoading,
  highlightedPersonSlug,
}: PeopleListProps) => {
  const findPersonByName = (name: string | null) => {
    return people.find(per => name === per.name);
  };

  return isLoading ? (
    <>
      <h1 className="title">People Page</h1>
      <Loader />
    </>
  ) : (
    <>
      <h1 className="title">People Page</h1>
      {people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      <div className="container">
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
            {people.map((person: Person) => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning':
                    person.slug === highlightedPersonSlug,
                })}
              >
                <td>
                  <Link
                    className={classNames({
                      'has-text-danger': person.sex === 'f',
                    })}
                    to={`/people/${person.slug}`}
                  >
                    {person.name}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {findPersonByName(person.motherName) && (
                    <Link
                      className="has-text-danger"
                      to={`/people/${findPersonByName(person.motherName)?.slug}`}
                    >
                      {person.motherName}
                    </Link>
                  )}
                  {!findPersonByName(person.motherName) &&
                    (person.motherName ? person.motherName : '-')}
                </td>
                <td>
                  {findPersonByName(person.fatherName) && (
                    <Link
                      to={`/people/${findPersonByName(person.fatherName)?.slug}`}
                    >
                      {person.fatherName}
                    </Link>
                  )}
                  {!findPersonByName(person.fatherName) &&
                    (person.fatherName ? person.fatherName : '-')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
