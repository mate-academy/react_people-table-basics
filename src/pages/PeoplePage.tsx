import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTableList } from '../components.tsx/PeopleTableList';
import { getPeople } from '../api';
import { Person } from '../types';

enum TextError {
  None,
  Load,
  NoPeople,
}

export const PeoplePage = () => {
  const { slug } = useParams();
  const [persons, setPersons] = useState<Person[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [textError, setTextError] = useState(TextError.None);

  useEffect(() => {
    setIsAdding(true);
    setTextError(TextError.None);
    getPeople()
      .then(person => {
        setPersons(person);
        if (person === undefined) {
          setTextError(TextError.NoPeople);
        }
      })
      .catch(() => setTextError(TextError.Load))
      .finally(() => setIsAdding(false));
  }, []);

  const findParent = (name: string) => {
    return persons.find(person => person.name === name);
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isAdding && <Loader />}
          {textError === TextError.Load
          && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>

          )}

          {(isAdding && textError === TextError.NoPeople)
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          <PeopleTableList
            persons={persons}
            findParent={findParent}
            onSelectedPerson={slug}
          />
        </div>
      </div>
    </>
  );
};
