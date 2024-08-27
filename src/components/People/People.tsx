import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person as PersonInterface } from '../../types';
import { getPeople } from '../../api';
import { Person } from '../Person/Person';
import { useParams } from 'react-router-dom';

export const People = () => {
  const { personName } = useParams();
  const [peaopleData, setPeopleData] = useState<PersonInterface[] | null>(null);
  const [loader, setLoader] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(db => {
        setPeopleData(db);
      })
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {showError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peaopleData?.length <= 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {peaopleData && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {peaopleData?.map(el => {
                  const motherData = peaopleData.findIndex(
                    m => m.name === el.motherName,
                  );
                  const fatherData = peaopleData.findIndex(
                    f => f.name === el.fatherName,
                  );

                  const newData = {
                    ...el,
                    mother: peaopleData[motherData],
                    father: peaopleData[fatherData],
                  };

                  return (
                    <Person key={el.name} data={newData} param={personName} />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
