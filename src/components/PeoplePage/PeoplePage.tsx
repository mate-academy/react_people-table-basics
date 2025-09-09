import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    const downloadPeople = async () => {
      try {
        setDataLoading(true);
        const peopleList = await getPeople();

        setPeople(peopleList);
      } catch (e) {
        setError(true);
        setPeople([]);
      } finally {
        setDataLoading(false);
        setFirstLoad(true);
      }
    };

    downloadPeople();
  }, []);

  const { slug } = useParams<{ slug: string }>();

  const somethingWrong = !dataLoading && error;
  const noPeople = !dataLoading && !error && firstLoad && people.length === 0;
  const displayTable = !dataLoading && !error && people.length > 0;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {dataLoading && <Loader />}

        {somethingWrong && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {noPeople && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {displayTable && <PeopleTable people={people} selectedSlug={slug} />}
      </div>
    </div>
  );
};
