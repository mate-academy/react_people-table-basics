import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../services/people';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState('');

  const { slug } = useParams();
  const selectedSlug = slug;

  function findParent(peopleList: Person[], parentName: string | null) {
    return peopleList.find((person) => person.name === parentName);
  }

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(peopleList => {
        setPeople(peopleList?.map(person => ({
          ...person,
          mother: findParent(peopleList, person.motherName),
          father: findParent(peopleList, person.fatherName),
        })));
      })
      .catch(() => setErrorMassage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}

          {!loading && people.length > 0 && (
            <PeopleTable
              people={people}
              selectedSlug={selectedSlug}
            />
          )}

          {!loading
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
