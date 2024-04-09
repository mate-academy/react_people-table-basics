import { Link, useParams } from 'react-router-dom';

import { usePeople } from '../context/PeopleContext';

import cn from 'classnames';

export const PeopleTable: React.FC = () => {
  const { people } = usePeople();
  const { path } = useParams();

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(per => per.name === person.motherName),
    father: people.find(per => per.name === person.fatherName),
  }));

  return (
    <div className="block">
      <div className="box table-container">
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
            {preparedPeople.map(person => {
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

              const male = sex === 'm';

              return (
                <tr
                  data-cy="person"
                  key={slug}
                  className={cn({
                    'has-background-warning': slug === path,
                  })}
                >
                  <td>
                    <Link
                      to={slug}
                      className={cn({
                        'has-text-danger': !male,
                      })}
                    >
                      {name}
                    </Link>
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>

                  <td>
                    {mother && (
                      <Link
                        className="has-text-danger"
                        to={`/people/${mother.slug}`}
                      >
                        {motherName}
                      </Link>
                    )}
                    {!mother && (motherName || '-')}
                  </td>

                  <td>
                    {father && (
                      <Link to={`/people/${father.slug}`}>{fatherName}</Link>
                    )}
                    {!father && (fatherName || '-')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
