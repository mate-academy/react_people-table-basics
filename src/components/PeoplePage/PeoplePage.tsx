import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    async function getPeopleFromServer() {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (err) {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    getPeopleFromServer();
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(
      potentialMother => potentialMother.name === person.motherName,
    );
    const father = people.find(
      potentialFather => potentialFather.name === person.fatherName,
    );

    return {
      ...person,
      ...(mother && { mother }),
      ...(father && { father }),
    };
  });

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!errorMessage && !loading && people.length && (
            <PeopleTable people={preparedPeople} />
          )}
        </div>
      </div>
    </div>
  );
};
