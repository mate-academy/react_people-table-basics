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
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
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
          {(isError && !isLoading) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {isLoading
            ? <Loader />
            : (
              <PeopleList
                people={people}
                personSlug={slug}
              />
            )}
        </div>
      </div>
    </>
  );
};
