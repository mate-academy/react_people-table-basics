import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { Loader } from '../Loader';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type PeopleTableProps = {
  peopleList?: Person[];
  loading?: boolean;
  hasError?: boolean;
};

export const PeopleTable = ({
  peopleList,
  loading,
  hasError,
}: PeopleTableProps) => {
  const { slug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
        {loading ? (
          <Loader />
        ) : peopleList?.length !== 0 ? (
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
              {peopleList?.map(person => {
                const mother = peopleList.find(
                  p => p.name === person.motherName,
                );
                const father = peopleList.find(
                  p => p.name === person.fatherName,
                );

                return (
                  // highlight here
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      <PersonLink person={mother} name={person.motherName} />
                    </td>
                    <td>
                      <PersonLink person={father} name={person.fatherName} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </div>
    </div>
  );
};
