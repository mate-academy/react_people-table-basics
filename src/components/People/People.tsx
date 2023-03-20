import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../utils/api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PersonTable';

export const People: React.FC = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(response => {
        setIsEmpty(!response.length);
        setPeopleData(response);
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
        ) : (
          <div className="block">
            <div className="box table-container">
              {(!hasError && !isEmpty) && (
                <Loader />
              )}

              {hasError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
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
