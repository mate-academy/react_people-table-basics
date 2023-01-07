import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
  selectedPerson: string,
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const getPersonByParent = (parent: string | null) => {
    return people.find(person => person.name === parent);
  };

  const activePerson = people.find(person => person.slug === selectedPerson);

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
            {people.map(({
              name,
              sex,
              born,
              died,
              motherName,
              fatherName,
              slug,
            }) => (
              <tr
                data-cy="person"
                key={slug}
                className={classNames({
                  'has-background-warning':
                  slug === activePerson?.slug,
                })}
              >

                <td>
                  <Link
                    className={classNames({
                      'has-text-danger': sex === 'f',
                    })}
                    to={`/people/${slug}`}
                  >
                    {name}
                  </Link>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <PersonLink
                  parent={motherName}
                  getPersonByParent={getPersonByParent}
                />

                <PersonLink
                  parent={fatherName}
                  getPersonByParent={getPersonByParent}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
