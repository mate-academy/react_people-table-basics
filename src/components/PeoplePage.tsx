import { Person } from './Person/Person';
import { FieldTypes } from '../utils/FieldTypes';
import { useLocalStorage } from '../utils/useLocalStorage';
import { Loader } from './Loader';

interface Props {}

export const PeoplePage: React.FC<Props> = () => {
  const { dataFromServer, isUploadError, isLoading, isEmptyError } =
    useLocalStorage();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isUploadError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : isEmptyError ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable is-narrow
                  is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>{FieldTypes.NAME}</th>
                      <th>{FieldTypes.SEX}</th>
                      <th>{FieldTypes.BORN}</th>
                      <th>{FieldTypes.DIED}</th>
                      <th>{FieldTypes.MOTHER}</th>
                      <th>{FieldTypes.FATHER}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dataFromServer.map(person => (
                      <Person person={person} key={person.slug} />
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
