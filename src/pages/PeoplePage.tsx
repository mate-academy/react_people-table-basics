import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isPeopleLoadError, setIsPeopleLoadError] = useState(false);
  const [isNoPeople, setIsNoPeople] = useState(false);
  const { slug = null } = useParams();

  const getPeopleList = async () => {
    setIsNoPeople(true);

    try {
      const loadPeopleList = await getPeople();

      setPeopleList(loadPeopleList);
    } catch {
      setIsPeopleLoadError(true);
    } finally {
      setIsNoPeople(false);
    }
  };

  useEffect(() => {
    getPeopleList();
  }, []);

  return (
    <>
      <div className="block">
        <h1 className="title">People Page</h1>

        {!isPeopleLoadError && (
          <div className="box table-container">
            {isNoPeople && <Loader />}

            <PeopleTable
              peopleList={peopleList}
              selectedPerson={slug}
              isNoPeople={isNoPeople}
            />
          </div>
        )}

        {isPeopleLoadError && !isNoPeople && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </div>
    </>
  );
};
