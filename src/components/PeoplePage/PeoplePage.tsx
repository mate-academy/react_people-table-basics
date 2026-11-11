import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonComponent } from '../Person/Person';

type Props = {
  people: Person[];
  LoadingError: boolean;
  isLoading: boolean;
};

export const PeoplePage = ({ people, LoadingError, isLoading }: Props) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {LoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading &&
            !LoadingError &&
            (people.length > 0 ? (
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
                  {people?.map(person => (
                    <PersonComponent key={person.slug} person={person} people={people} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ))}
        </div>
      </div>
    </>
  );
};
