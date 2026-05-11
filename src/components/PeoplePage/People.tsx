import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [peopleError, setPeopleError] = useState(false);
  const [arrPeopleEmpty, setArrPeopleEmpty] = useState(false);

  const peopleWithParents = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(arrPeople => {
        setPeople(arrPeople);

        if (arrPeople.length === 0) {
          setArrPeopleEmpty(true);
        }
      })
      .catch(() => {
        setPeopleError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {peopleError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {arrPeopleEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loader && <PeopleTable people={peopleWithParents} />}
        </div>
      </div>
    </div>
  );
};
