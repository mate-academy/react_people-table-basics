import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [isError, setIsError] = useState(true);
  const [isLoad, setIsLoad] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const getPeopleFromServer = await getPeople();

        setPeople(getPeopleFromServer);
      } catch (error) {
        setIsError(false);
      } finally {
        setIsLoad(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoad
            ? <Loader />
            : (
              (
                isError
                  ? (
                    <PeopleTable
                      peoples={people}
                      selectedSlug={slug}
                    />
                  )
                  : (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )
              )
            )}
        </div>
      </div>
    </>
  );
};
