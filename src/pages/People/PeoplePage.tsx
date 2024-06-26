import { useContext } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleList } from '../../components/PeopleList/PeopleList';
import { PeopleContext } from '../../peopleContext';

export const PeoplePage = () => {
  const { loader, warning } = useContext(PeopleContext);

  return (
    <>
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
    </>
  );
};
