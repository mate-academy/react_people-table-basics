import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api/api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';

export const PersonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [alarm, setAlarm] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(list => {
        if (list.length === 0) {
          setAlarm(true);
        }

        setPeopleList(list);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loader ? (
          <Loader />
        ) : (
          <PeopleTable
            peopleList={peopleList}
            slug={slug}
            error={error}
            alarm={alarm}
          />
        )}
      </div>
    </div>
  );
};
