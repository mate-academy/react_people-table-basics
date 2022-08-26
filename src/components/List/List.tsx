import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonalLink } from '../PersonalLink/PersonalLink';

type Props = {
  people: Person[];
  selectedPerson: string;
};

export const List: React.FC<Props> = ({ people, selectedPerson }) => {
  return (
    <>
      {people.length === 0
        ? <p data-cy="noPeopleMessage">There are no people on the server</p>
        : (
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
              {people.map(person => (
                <tr
                  data-cy="person"
                  key={person.name}
                  className={classNames({
                    'has-background-warning': person.slug === selectedPerson,
                  })}
                >
                  <td>
                    <PersonalLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {
                      (person.mother
                        ? (
                          <Link className="has-text-danger" to={`/people/${person.mother.slug}`}>
                            {person.motherName}
                          </Link>
                        )
                        : person.motherName) || '-'
                    }
                  </td>
                  <td>
                    {
                      (person.father
                        ? (
                          <Link to={`/people/${person.father.slug}`}>
                            {person.fatherName}
                          </Link>
                        )
                        : person.fatherName) || '-'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
