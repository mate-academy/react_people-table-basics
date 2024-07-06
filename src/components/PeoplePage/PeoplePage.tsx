import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';

const preparePeople = (people: Person[]) => {
  return people.map(child => {
    const mother = people.find(
      person => person.name === child.motherName,
    );
    const father = people.find(
      person => person.name === child.fatherName,
    );

    let result = { ...child };

    if (mother) {
      result = { ...result, mother };
    }

    if (father) {
      result = { ...result, father };
    }

    return result;
  });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = preparePeople(peopleFromServer);

        setPeople(preparedPeople);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !loading && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
