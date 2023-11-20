import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  peopleList: Person[];
  loadingError: string;
  loading: boolean;
}

export const PeoplePage: React.FC<Props> = ({
  peopleList, loadingError, loading,
}) => {
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleList.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

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
              {peopleList.map((person) => {
                const fatherLink = peopleList
                  .find((potentialPerson) => potentialPerson.name
                  === person.fatherName);
                const motherLink = peopleList
                  .find((potentialPerson) => potentialPerson.name
                  === person.motherName);

                return (
                  <tr
                    data-cy="person"
                    key={person.name}
                    className={cn({
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
                      {motherLink
                        ? (
                          <PersonLink person={motherLink} />
                        )
                        : (person.motherName || '-')}
                    </td>
                    <td>
                      {fatherLink
                        ? (
                          <PersonLink person={fatherLink} />
                        )
                        : (person.fatherName || '-')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
