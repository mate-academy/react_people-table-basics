import { useEffect, useState } from 'react';
// import PeopleTable from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import PeopleTable from '../components/PeopleTable';

type Parent = 'father' | 'mother';

const getParent = (
  people: Person[],
  person: Person,
  parent: Parent,
) => {
  if (parent === 'father') {
    return people.find(({ name }) => name === person.fatherName);
  }

  return people.find(({ name }) => name === person.motherName);
};

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const preparePeople = () => {
    setIsPending(true);

    getPeople().then(result => {
      const prepared = result.map(person => ({
        ...person,
        father: getParent(result, person, 'father'),
        mother: getParent(result, person, 'mother'),
      }));

      setPeople(prepared);
    })
      .catch(() => setIsError(true))
      .finally(() => setIsPending(false));
  };

  useEffect(() => {
    preparePeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isPending
            ? <Loader />
            : (
              <PeopleTable
                onError={isError}
                people={people}
              />
            )}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
