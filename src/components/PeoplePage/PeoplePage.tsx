import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState([] as Person[]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const renderPeoplePageContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!people.length) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return <PeopleTable people={people} />;
  };

  const addParentsForEach = (peopleArr: Person[]) => peopleArr.map(person => {
    const result = { ...person };
    let father = null;
    let mother = null;

    if (person.fatherName) {
      father = peopleArr
        .find(possibleDad => possibleDad.name === person.fatherName);
    }

    if (person.motherName) {
      mother = peopleArr
        .find(possibleMom => possibleMom.name === person.motherName);
    }

    if (father) {
      result.father = father;
    }

    if (mother) {
      result.mother = mother;
    }

    return result;
  });

  useEffect(() => {
    getPeople()
      .then(addParentsForEach)
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {renderPeoplePageContent()}
        </div>
      </div>
    </>
  );
};
