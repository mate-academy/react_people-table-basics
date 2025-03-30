import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { fillParents } from './service';
import { Title } from '../Title';

interface StateTypes {
  isLoading: boolean;
  isLoadingError: boolean;
  isListEmpty: boolean;
  isShowList: boolean;
  peopleList: Person[];
}

export const PeoplePage = () => {
  const [state, setState] = useState<StateTypes>({
    isLoading: true,
    isLoadingError: false,
    isListEmpty: false,
    isShowList: false,
    peopleList: [],
  });

  const { pathname } = useLocation();

  const { isLoading, isLoadingError, isListEmpty, isShowList, peopleList } =
    state;

  useEffect(() => {
    getPeople()
      .then(data => {
        setState({
          ...state,
          peopleList: fillParents(data),
          isListEmpty: data.length === 0,
          isShowList: true,
          isLoading: false,
        });
      })
      .catch(() => {
        setState({
          ...state,
          isLoading: false,
          isLoadingError: true,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p>
      <Title text="People Page" />

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isListEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isShowList && (
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
                {peopleList.map(person => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                    mother,
                    father,
                  } = person;
                  const isHighlighted = pathname.includes(slug);

                  const motherCell = mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    <td>{motherName || '-'}</td>
                  );

                  const fatherCell = father ? (
                    <PersonLink person={father} />
                  ) : (
                    <td>{fatherName || '-'}</td>
                  );

                  return (
                    <tr
                      data-cy="person"
                      key={name}
                      className={classNames({
                        'has-background-warning': isHighlighted,
                      })}
                    >
                      <PersonLink person={person} />
                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      {motherCell}
                      {fatherCell}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </p>
  );
};
