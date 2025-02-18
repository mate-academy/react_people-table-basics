import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [people.length]);

  const addedPeople = people.map(person => ({
    ...person,
    father: people.find(p => p.name === person.fatherName),
    mother: people.find(p => p.name === person.motherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!!ErrorMessage.length && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ErrorMessage}
            </p>
          )}

          {isLoading ? <Loader /> : <PeopleTable people={addedPeople} />}
        </div>
      </div>
    </>
  );
};
