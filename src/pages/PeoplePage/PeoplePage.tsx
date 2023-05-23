import { FC } from 'react';
import { useFetchPeople } from '../../custom-hooks/useFetch';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: FC = () => {
  const { people, isLoading, errorMessage } = useFetchPeople();

  const findParent = (parentName: string | null) => {
    if (parentName) {
      return people?.find(person => person.name === parentName);
    }

    return null;
  };

  const peopleWithParents = people.map((person) => {
    return {
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {peopleWithParents.length !== 0 && (
            <PeopleTable people={peopleWithParents} />
          )}
        </div>
      </div>
    </>
  );
};
