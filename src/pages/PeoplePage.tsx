import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../services/people';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState('');

  const { slug: selectedSlug } = useParams();

  // const location = useLocation();
  // console.log(location);

  function findParent(peopleList: Person[], parentName: string | null) {
    return peopleList.find((person) => person.name === parentName);
  }

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleList => {
        setPeople(peopleList?.map(person => ({
          ...person,
          mother: findParent(peopleList, person.motherName),
          father: findParent(peopleList, person.fatherName),
        })));
      })
      .catch(() => setErrorMassage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {!isLoading && people.length > 0 && (
            <PeopleTable
              people={people}
              selectedSlug={selectedSlug}
            />
          )}

          {!isLoading
          && !errorMassage
          && people.length === 0
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {errorMassage && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {errorMassage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
