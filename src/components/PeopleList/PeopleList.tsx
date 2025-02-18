import cn from 'classnames';

import { Person } from '../../types';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { renderParentLink } from '../../Helper/renderParentLink';
import { Loader } from '../Loader/Loader';

type Props = {
  people: Person[];
  peopleLoadingError: boolean;
  isLoading: boolean;
};

export const PeopleList: React.FC<Props> = ({
  people,
  peopleLoadingError,
  isLoading,
}) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isPeopleEmpty = people.length === 0;

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    personSlug: string,
  ) => {
    event.preventDefault();
    navigate(`/people/${personSlug}`, { replace: true });
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && isPeopleEmpty && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {peopleLoadingError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !isPeopleEmpty && (
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
              {people.map(person => {
                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <NavLink
                        to={`/people/${person.slug}`}
                        className={cn({
                          'has-text-danger': person.sex === 'f',
                        })}
                        onClick={e => handleClick(e, person.slug)}
                      >
                        {person.name}
                      </NavLink>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{renderParentLink(person, people, 'motherName')}</td>
                    <td>{renderParentLink(person, people, 'fatherName')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
