import { useEffect, useState } from 'react';
import { getPeople } from '../api/data';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Table/PeopleTable';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setErrorMessage('');

    getPeople()
      .then(people => {
        const modifyPersons = people.map(person => {
          const motherPerson = people.find(
            peop => peop.name === person.motherName,
          );
          const fatherPerson = people.find(
            peop => peop.name === person.fatherName,
          );

          const copyPerson = { ...person };

          if (motherPerson) {
            copyPerson.mother = { ...motherPerson };
          }

          if (fatherPerson) {
            copyPerson.father = { ...fatherPerson };
          }

          return copyPerson;
        });

        setPersons(modifyPersons);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}
          {persons.length === 0 && !errorMessage && !loader && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {persons.length !== 0 && <PeopleTable persons={persons} />}
        </div>
      </div>
    </div>
  );
};
