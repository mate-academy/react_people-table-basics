import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../utils/fetchClient';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const People: FC = () => {
  const [peopleData, setPeople] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(res => {
        setIsEmpty(!res.length);
        setPeople(res);
      })
      .catch(() => setHasError(true));
  }, []);

  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      {peopleData.length
        ? (
          <PeopleTable
            peopleData={peopleData}
            selectedPerson={slug}
          />
        )
        : (
          <div className="block">
            <div className="box table-container">
              {(!hasError && !isEmpty) && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        )}
    </>
  );
};
