import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = useMemo(() => {
    function getFather(fatherName: string | null) {
      return people.find(person => fatherName === person.name) || null;
    }

    function getMother(motherName: string | null) {
      return people.find(person => motherName === person.name) || null;
    }

    return people.map(person => ({
      ...person,
      father: getFather(person.fatherName),
      mother: getMother(person.motherName),
    }));
  }, [people]);

  // function getContent() {
  //   if (isLoading) {
  //     return <Loader />;
  //   }

  //   if (people.length) {
  //     return <PeopleTable people={peopleWithParents} />;
  //   }

  //   if (errorMessage) {
  //     return (
  //       <p data-cy="peopleLoadingError" className="has-text-danger">
  //         {errorMessage}
  //       </p>
  //     );
  //   }

  //   return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  // }

  function getContent() {
    if (isLoading) {
      return <Loader />;
    }

    if (errorMessage) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      );
    }

    return false;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {getContent()}

          {/* {!people.length ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={peopleWithParents} />
          )} */}

          {isLoading && !people.length ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={peopleWithParents} />
          )}
        </div>
      </div>
    </>
  );
};
