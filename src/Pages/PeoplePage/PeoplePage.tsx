import { useEffect, useState } from 'react';
import { fetchFunction } from '../../api/fetchFunction';
import { People } from '../../types/People';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    fetchFunction()
      .then(res => {
        if (res.data !== null) {
          setPeople(res.data);
        } else {
          // eslint-disable-next-line no-console
          console.warn(res.responseError.message);
        }
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <table className="table is-striped is-hoverable table-position">
        <thead>
          <tr className="person">
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Slug</th>
          </tr>
        </thead>
        <tbody>
          {
            people.length > 0 && (
              people.map(el => (
                <tr className="person" key={el.name}>
                  <td>{el.name}</td>
                  <td>{el.sex}</td>
                  <td>{el.born}</td>
                  <td>{el.died}</td>
                  <td>{el?.fatherName && el.fatherName.split(' ')[0]}</td>
                  <td>{el?.motherName && el.motherName.split(' ')[0]}</td>
                  <td>{el.slug}</td>
                </tr>
              ))
            )
          }
        </tbody>
        <tfoot>
          <tr className="person">
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Slug</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
