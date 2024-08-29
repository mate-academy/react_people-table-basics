import { usePeopleService } from '../services/usePeopleService';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { isLoading, getPeople, isError } = usePeopleService();
  const [peopleList, setPeopleList] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeopleList);
  }, []);

  const loading = isLoading && <Loader />;
  const error = isError && (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
  const isEmptyList = !(loading || isError || peopleList.length) && (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  );

  const content = !(
    isLoading ||
    isError ||
    !peopleList.length ||
    isEmptyList
  ) && <PeopleTable peopleList={peopleList} />;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {loading}
            {error}
            {isEmptyList}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};
