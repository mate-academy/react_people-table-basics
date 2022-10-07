import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader';

type Props = {
  people: Person[];
  isLoading: boolean;
  error: string
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  error,
}) => {
  const { slug = '' } = useParams();
  const findPeopleParent = (name: string | null) => (
    people.find(pers => pers.name === name) || null);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading
          ? (<Loader />)
          : (
            <>
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>

              {!people.length && (
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
                  {
                    people.map(person => (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={classNames(
                          { 'has-background-warning': person.slug === slug },
                        )}
                      >
                        <PersonLink
                          person={person}
                          findPeopleParent={findPeopleParent}
                        />
                      </tr>

                    ))
                  }
                </tbody>
              </table>
            </>

          )}

      </div>
    </div>
  );
};
