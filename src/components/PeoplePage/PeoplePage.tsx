import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';


export const PeoplePage = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [problemServer, setProblemServer] = useState(false);



  useEffect(() => {
    getPeople()
      .then(resp => {
        setPeople(resp);
        setIsLoad(false);
      })

      .catch(() => {
        setIsLoad(false);
        setProblemServer(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoad ? (
            <Loader />
          ) : problemServer ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={people}/>
          )}
        </div>
      </div>
    </>
  );
};
