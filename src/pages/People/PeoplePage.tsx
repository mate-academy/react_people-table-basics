import { useContext, useEffect } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleList } from '../../components/PeopleList/PeopleList';
import { PeopleContext } from '../../peopleContext';

export const PeoplePage = () => {
  const { loader, warning, setLoader, setPeople, setWarning } =
    useContext(PeopleContext);

  useEffect(() => {
    getPeople()
      .then(res => {
        if (!res) {
          setWarning('There are no people on the server');
        } else {
          setWarning('');
        }

        setPeople([...res]);
      })
      .catch(error => {
        setWarning('Something went wrong');
        throw error;
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}
          {loader || warning || (
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
              <PeopleList />
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
