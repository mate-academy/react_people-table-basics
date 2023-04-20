import { useParams } from 'react-router-dom';
import { PeopleItem } from '../components/PeopleItem';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const People: React.FC<{
  peopleFromServer: Person[] | undefined;
  errorMessage: string | undefined;
}> = ({ peopleFromServer, errorMessage }) => {
  const { slug = '' } = useParams();

  if (peopleFromServer) {
    return (
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {errorMessage && (
              <p
                data-cy={
                  peopleFromServer.length === 0
                    ? 'noPeopleMessage'
                    : 'peopleLoadingError'
                }
                className="has-text-danger"
              >
                {errorMessage}
              </p>
            )}

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
                {peopleFromServer
                  && peopleFromServer.map((person) => {
                    return (
                      <PeopleItem
                        person={person}
                        key={person.name}
                        selectedTodoId={slug}
                        peopleFromServer={peopleFromServer}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <Loader />;
};
