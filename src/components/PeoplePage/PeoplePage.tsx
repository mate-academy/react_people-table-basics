import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
// import { PersonLink } from '../Person/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';

interface Props {
  people: Person[];
  isDataUploaded: boolean;
  findMotherSlug: (child: Person) => string | null;
  findFatherSlug: (child: Person) => string | null;
}

export const PeoplePage: React.FC<Props> = ({
  people,
  isDataUploaded,
  findMotherSlug,
  findFatherSlug,
}) => {
  const { personSlug } = useParams();

  // console.log(routeParams)

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!isDataUploaded && <Loader />}

          {isDataUploaded && people.length === 0 && (
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
