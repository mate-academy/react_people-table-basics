import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../Links/PersonLink';

type Props = {
  people: Person[],
  error: boolean,
};

export const PeopleTable: React.FC<Props> = ({ people, error }) => {
  const { slug } = useParams();

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
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
        {people.length === 0
          ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )
          : (
            people.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames(null, {
                  'has-background-warning': person.slug === slug,
                })}
              >
                <PersonLink person={person} />
              </tr>
            ))
          )}
      </tbody>
    </table>
  );
};
