import cn from 'classnames';
import { useMatch } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

type Props = {
  isLoading: boolean,
  hasLoadingError: boolean,
  displayedPeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  isLoading,
  hasLoadingError,
  displayedPeople,
}) => {
  const match = useMatch('/people/:slug');
  const activeSlug = match?.params.slug;

  const getPersonByName = (name: string | null) => {
    return displayedPeople
      .find(person => person.name === name);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasLoadingError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!displayedPeople.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
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
        {displayedPeople.map((person) => {
          const {
            fatherName,
            motherName,
            slug,
            sex,
            born,
            died,
          } = person;
          const mother = getPersonByName(motherName);
          const father = getPersonByName(fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={
                cn({ 'has-background-warning': slug === activeSlug })
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother?.slug
                  ? <PersonLink person={mother} />
                  : <p>{motherName || '-'}</p>}
              </td>

              <td>
                {father?.slug
                  ? <PersonLink person={father} />
                  : <p>{fatherName || '-'}</p>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
