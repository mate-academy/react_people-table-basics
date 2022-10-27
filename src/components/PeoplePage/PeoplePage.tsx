import { useEffect, useState } from 'react';
import {getPeople} from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);
    const peopleFromServer = await getPeople();
    setIsLoading(false);

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    loadPeople();
  },[]);


  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>

          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
          <PeopleTable
            people={people}
          />
        </div>
      </div>

    </>

  )
}
