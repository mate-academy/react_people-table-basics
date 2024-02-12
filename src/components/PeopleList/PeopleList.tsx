import { useContext } from 'react';
import { PersonItem } from '../PersonItem/PersonItem';
import { PeopleContext } from '../../store/PeopleContext';

export const PeopleList: React.FC = () => {
  const { peoples, errorMessage } = useContext(PeopleContext);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      { errorMessage === '' && (
        <>
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
            {peoples.map((person) => (
              <PersonItem person={person} key={person.slug} />
            ))}
          </tbody>
        </>
      )}
      { peoples.length === 0 && errorMessage === '' && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      { errorMessage === 'Something went wrong' && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </table>
  );
};
