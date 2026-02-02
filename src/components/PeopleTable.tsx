import { Loader } from './Loader';
import { useContext } from 'react';
import { UsersContext } from '../store/PeopleContext';
import { PersonLink } from './PersonLink';
import { Notification } from '../types/Notification';

export const PeopleTable = () => {
  const { people, message, loading } = useContext(UsersContext);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {!loading && message === Notification.LoadingError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {message}
          </p>
        )}

        {!loading &&
          message !== Notification.LoadingError &&
          people.length === 0 && <p data-cy="noPeopleMessage">{message}</p>}

        {!loading && !message && (
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
                <PersonLink key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
