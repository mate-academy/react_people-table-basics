import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PeopleList } from '../../components/PeopleList';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const loadPeople = await getPeople();

        setPeople(loadPeople);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <PeopleList
                people={people}
                personSlug={slug}
                isError={isError}
              />
            )}
        </div>
      </div>
    </>

  );
};
