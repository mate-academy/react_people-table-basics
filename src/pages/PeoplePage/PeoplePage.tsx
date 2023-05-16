import { FC } from 'react';
import { useFetch } from '../../custom-hooks/useFetch';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { API_URL } from '../../constants/apiUrl';

export const PeoplePage: FC = () => {
  const { people, isLoading, errorMessage } = useFetch(API_URL);

  const getPerent = (parentName: string | null) => {
    if (parentName) {
      return people?.find(person => person.name === parentName);
    }

    return null;
  };

  const peopleWithPerents = people ? people.map((person) => {
    return {
      ...person,
      mother: getPerent(person.motherName),
      father: getPerent(person.fatherName),
    };
  }) : [];

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

          {people?.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && (<PeopleTable people={peopleWithPerents} />)}
        </div>
      </div>
    </>
  );
};
