import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

interface Props {
  isError: boolean;
  people: Person[];
  isDataUploaded: boolean;
  findMotherSlug: (child: Person) => string | null;
  findFatherSlug: (child: Person) => string | null;
}

export const PeoplePage: React.FC<Props> = ({
  isError,
  people,
  isDataUploaded,
  findMotherSlug,
  findFatherSlug,
}) => {
  const { personSlug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!isDataUploaded && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isError && isDataUploaded && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable
              people={people}
              findMotherSlug={findMotherSlug}
              findFatherSlug={findFatherSlug}
              selectedPerson={personSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
