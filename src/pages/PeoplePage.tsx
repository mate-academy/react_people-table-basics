import { useEffect, useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { Person } from '../types';
import { ErrorMassege } from '../types/ErrorMessage';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<ErrorMassege | null>(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setError(null);

    getPeople()
      .then(peopleList => {
        setPeople(peopleList);

        if (peopleList.length === 0) {
          setError(ErrorMassege.NoPeople);
        }
      })
      .catch(() => setError(ErrorMassege.SomethingWentWrong))
      .finally(() => {
        setPeople(currentPeople =>
          currentPeople.map(currentPerson => {
            const mother = currentPeople.find(
              person => person.name === currentPerson.motherName,
            );
            const father = currentPeople.find(
              person => person.name === currentPerson.fatherName,
            );

            if (mother && father) {
              return { ...currentPerson, mother, father };
            }

            if (mother) {
              return { ...currentPerson, mother };
            }

            if (father) {
              return { ...currentPerson, father };
            }

            return { ...currentPerson };
          }),
        );

        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {error && <ErrorMessage error={error} />}

          {people && !loader && !error && <PeopleList people={people} />}
        </div>
      </div>
    </>
  );
};
